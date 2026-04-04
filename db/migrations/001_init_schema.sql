-- UHIP-2A / AuditorSEC Multi-Tenant Postgres Schema
-- PostgreSQL 16+
-- Migration: 001_init_schema

BEGIN;

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLE: accounts — multi-tenancy root
-- ============================================================
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    vat VARCHAR(20),
    diia_city_resident BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: engagements — grants, projects, business links
-- ============================================================
CREATE TABLE engagements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type VARCHAR(30) CHECK (type IN ('grant', 'contract', 'pilot', 'audit', 'compliance', 'tender')),
    status VARCHAR(20) CHECK (status IN ('draft', 'submitted', 'active', 'completed', 'rejected', 'archived')),
    risk_level VARCHAR(10) CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    deadline TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: files — core file inventory with domain tags
-- ============================================================
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    engagement_id UUID REFERENCES engagements(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    type VARCHAR(10) CHECK (type IN ('pdf', 'pptx', 'docx', 'xlsx', 'csv', 'json', 'md', 'py', 'img', 'yaml', 'other')),
    domain VARCHAR(20) CHECK (domain IN ('infra', 'strategy', 'grants', 'media', 'legal', 'finance', 'security', 'ops')),
    url TEXT,
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    priority_score NUMERIC(5,2) DEFAULT 0,
    status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'archive', 'draft', 'deleted')),
    web3_tags TEXT[] DEFAULT '{}',
    checksum VARCHAR(64),
    size_bytes BIGINT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: media_catalog — media-specific extension
-- ============================================================
CREATE TABLE media_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    media_type VARCHAR(10) CHECK (media_type IN ('pdf', 'pptx', 'docx', 'img', 'video', 'audio')),
    project VARCHAR(50) CHECK (project IN ('AuditorSEC', 'RehabFund', 'Bakhmach', 'UHIP2A', 'Other')),
    page_count INT,
    slide_count INT,
    thumbnail_url TEXT,
    ocr_text TEXT,
    ai_summary TEXT,
    classification JSONB DEFAULT '{}',
    status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'archive', 'processing')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: automations — n8n/webhook triggers
-- ============================================================
CREATE TABLE automations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES files(id) ON DELETE SET NULL,
    engagement_id UUID REFERENCES engagements(id) ON DELETE SET NULL,
    trigger_type VARCHAR(30) CHECK (trigger_type IN (
        'file_upload', 'railway_deploy', 'github_push', 'grafana_alert',
        'monday_update', 'ci_cd_event', 'cron_schedule', 'manual', 'prozorro_tender'
    )),
    action_type VARCHAR(30) CHECK (action_type IN (
        'n8n_workflow', 'telegram_notify', 'slack_post', 'classify_file',
        'risk_score_update', 'grafana_dashboard', 'clickup_task', 'linear_issue'
    )),
    n8n_workflow_id TEXT,
    webhook_url TEXT,
    payload_template JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered TIMESTAMPTZ,
    trigger_count INT DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: risk_events — UHIP-2A risk spine
-- ============================================================
CREATE TABLE risk_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id UUID REFERENCES engagements(id) ON DELETE SET NULL,
    entity_type VARCHAR(20) CHECK (entity_type IN ('project', 'contract', 'counterparty', 'transaction', 'tender')),
    entity_ref TEXT,
    risk_category VARCHAR(20) CHECK (risk_category IN ('corruption', 'technical', 'cyber', 'esg', 'financial', 'compliance')),
    severity INT CHECK (severity BETWEEN 1 AND 5),
    impact INT CHECK (impact BETWEEN 1 AND 5),
    risk_score NUMERIC(5,2) GENERATED ALWAYS AS (severity * impact * 1.0) STORED,
    description TEXT,
    source VARCHAR(30),
    resolved BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- files
CREATE INDEX idx_files_domain_date ON files (domain, upload_date DESC);
CREATE INDEX idx_files_tenant_status ON files (tenant_id, status);
CREATE INDEX idx_files_web3_tags ON files USING GIN (web3_tags);
CREATE INDEX idx_files_metadata ON files USING GIN (metadata);
CREATE INDEX idx_files_type_domain ON files (type, domain);

-- media_catalog
CREATE INDEX idx_media_project_type ON media_catalog (project, media_type);
CREATE INDEX idx_media_status ON media_catalog (status) WHERE status = 'active';
CREATE INDEX idx_media_classification ON media_catalog USING GIN (classification);

-- engagements
CREATE INDEX idx_engagements_account ON engagements (account_id, status);
CREATE INDEX idx_engagements_deadline ON engagements (deadline) WHERE status IN ('draft', 'submitted', 'active');

-- automations
CREATE INDEX idx_automations_trigger ON automations (trigger_type) WHERE is_active = TRUE;
CREATE INDEX idx_automations_file ON automations (file_id);

-- risk_events
CREATE INDEX idx_risk_events_engagement ON risk_events (engagement_id, risk_category);
CREATE INDEX idx_risk_events_severity ON risk_events (risk_score DESC) WHERE resolved = FALSE;
CREATE INDEX idx_risk_events_source ON risk_events (source, created_at DESC);

-- ============================================================
-- MATERIALIZED VIEWS
-- ============================================================

-- Active media in last 30 days
CREATE MATERIALIZED VIEW active_media AS
SELECT mc.*, f.name AS file_name, f.domain, f.url, f.web3_tags, f.priority_score
FROM media_catalog mc
JOIN files f ON mc.file_id = f.id
WHERE mc.status = 'active' AND f.upload_date > NOW() - INTERVAL '30 days'
WITH DATA;

-- High-risk dashboard
CREATE MATERIALIZED VIEW high_risk_dashboard AS
SELECT re.*, e.name AS engagement_name, a.name AS account_name
FROM risk_events re
LEFT JOIN engagements e ON re.engagement_id = e.id
LEFT JOIN accounts a ON e.account_id = a.id
WHERE re.resolved = FALSE AND re.risk_score >= 10
ORDER BY re.risk_score DESC
WITH DATA;

-- File inventory by domain
CREATE MATERIALIZED VIEW file_inventory AS
SELECT domain, type, status, COUNT(*) AS file_count,
       MAX(upload_date) AS latest_upload,
       AVG(priority_score) AS avg_priority
FROM files WHERE status = 'active'
GROUP BY domain, type, status
WITH DATA;

-- Unique indexes for CONCURRENTLY refresh
CREATE UNIQUE INDEX idx_active_media_id ON active_media (id);
CREATE UNIQUE INDEX idx_high_risk_dashboard_id ON high_risk_dashboard (id);
CREATE UNIQUE INDEX idx_file_inventory_key ON file_inventory (domain, type, status);

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON files
    USING (tenant_id = current_setting('app.current_tenant', true)::UUID);

-- Allow superusers / service role to bypass RLS
ALTER TABLE files FORCE ROW LEVEL SECURITY;

COMMIT;
