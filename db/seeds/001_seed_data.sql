-- UHIP-2A / AuditorSEC Seed Data
-- Run after 001_init_schema.sql

BEGIN;

-- ============================================================
-- ACCOUNTS
-- ============================================================
INSERT INTO accounts (id, name, vat, diia_city_resident, metadata) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'AuditorSEC LLC', '46077399', TRUE,
     '{"website": "https://auditorsec.io", "country": "UA", "sector": "cybersecurity"}'),
    ('a0000000-0000-0000-0000-000000000002', 'NGO Digital', NULL, FALSE,
     '{"website": "https://ngodigital.org", "country": "UA", "sector": "civic-tech"}'),
    ('a0000000-0000-0000-0000-000000000003', 'RehabFund', NULL, FALSE,
     '{"country": "UA", "sector": "anti-corruption", "focus": "OSINT"}');

-- ============================================================
-- ENGAGEMENTS
-- ============================================================
INSERT INTO engagements (id, account_id, name, type, status, risk_level, deadline, metadata) VALUES
    ('e0000000-0000-0000-0000-000000000001',
     'a0000000-0000-0000-0000-000000000001',
     'BRAVE1 Application', 'grant', 'submitted', 'medium',
     '2026-06-01T00:00:00Z',
     '{"program": "BRAVE1", "track": "C", "amount_usd": 150000}'),
    ('e0000000-0000-0000-0000-000000000002',
     'a0000000-0000-0000-0000-000000000001',
     'NIS2 Compliance', 'compliance', 'active', 'high',
     '2026-12-31T00:00:00Z',
     '{"directive": "NIS2", "scope": "critical-infrastructure"}'),
    ('e0000000-0000-0000-0000-000000000003',
     'a0000000-0000-0000-0000-000000000003',
     'Bakhmach Green Energy Pilot', 'pilot', 'draft', 'low',
     '2026-09-01T00:00:00Z',
     '{"location": "Bakhmach, Chernihiv Oblast", "focus": "green-energy"}'),
    ('e0000000-0000-0000-0000-000000000004',
     'a0000000-0000-0000-0000-000000000001',
     'UHIP-2A Integrated Plan', 'audit', 'active', 'critical',
     '2026-08-01T00:00:00Z',
     '{"scope": "full-spectrum", "components": ["AuditorSEC", "RehabFund", "CRM"]}'),
    ('e0000000-0000-0000-0000-000000000005',
     'a0000000-0000-0000-0000-000000000001',
     'Investor Fundraising Round', 'contract', 'active', 'medium',
     '2026-07-15T00:00:00Z',
     '{"round": "pre-seed", "target_usd": 500000}');

-- ============================================================
-- FILES — 25+ records from Perplexity Computer inventory
-- ============================================================

-- Media Files (domain: media)
INSERT INTO files (id, tenant_id, engagement_id, name, type, domain, url, upload_date, priority_score, status, web3_tags, metadata) VALUES
    ('f0000000-0000-0000-0000-000000000001',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000005',
     'Llm Bridge Pitch Deck', 'pptx', 'media', NULL, '2026-03-16T10:00:00Z', 8.0, 'active',
     ARRAY['LLM', 'bridge', 'investors'], '{"slides": 18, "version": "v2"}'),
    ('f0000000-0000-0000-0000-000000000002',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001',
     'Nato Diana Quad Chart', 'pptx', 'media', NULL, '2026-03-17T09:00:00Z', 9.0, 'active',
     ARRAY['defense', 'NATO'], '{"slides": 4, "classification": "unclassified"}'),
    ('f0000000-0000-0000-0000-000000000003',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002',
     'Pqc Master Plan', 'pdf', 'media', NULL, '2026-03-18T14:30:00Z', 9.5, 'active',
     ARRAY['PQC', 'quantum', 'post-quantum'], '{"pages": 24}'),
    ('f0000000-0000-0000-0000-000000000004',
     'a0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003',
     'Greengrid Powerboost Declaration', 'pdf', 'media', NULL, '2026-03-19T11:00:00Z', 7.0, 'active',
     ARRAY['green-energy', 'ESG'], '{"pages": 12}'),
    ('f0000000-0000-0000-0000-000000000005',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000004',
     'Realtime Audit Compromawka Report', 'pdf', 'media', NULL, '2026-03-20T08:00:00Z', 9.0, 'active',
     ARRAY['audit', 'DeFi', 'smart-contract'], '{"pages": 36}'),
    ('f0000000-0000-0000-0000-000000000006',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000004',
     'Uhip2a Auditorsec Plan', 'pdf', 'media', NULL, '2026-03-21T16:00:00Z', 10.0, 'active',
     ARRAY['strategy', 'OSINT', 'UHIP2A'], '{"pages": 42}');

-- Infrastructure Files (domain: infra)
INSERT INTO files (id, tenant_id, engagement_id, name, type, domain, url, upload_date, priority_score, status, web3_tags, metadata) VALUES
    ('f0000000-0000-0000-0000-000000000007',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'railway.toml', 'yaml', 'infra', NULL, '2026-03-15T12:00:00Z', 6.0, 'active',
     ARRAY['deployment'], '{"service": "railway"}'),
    ('f0000000-0000-0000-0000-000000000008',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'bot_ecosystem.py', 'py', 'infra', NULL, '2026-03-22T09:00:00Z', 7.0, 'active',
     ARRAY['telegram', 'automation'], '{"bots": 5, "language": "python"}'),
    ('f0000000-0000-0000-0000-000000000009',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'n8n workflow JSON', 'json', 'infra', NULL, '2026-03-23T10:00:00Z', 7.5, 'active',
     ARRAY['n8n', 'automation'], '{"workflows": 3}'),
    ('f0000000-0000-0000-0000-000000000010',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'docker-compose.yml', 'yaml', 'infra', NULL, '2026-03-24T11:00:00Z', 6.5, 'active',
     ARRAY['K8s', 'deployment'], '{"services": 4}');

-- Strategy Files (domain: strategy)
INSERT INTO files (id, tenant_id, engagement_id, name, type, domain, url, upload_date, priority_score, status, web3_tags, metadata) VALUES
    ('f0000000-0000-0000-0000-000000000011',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000005',
     'AuditorSEC Executive Summary', 'docx', 'strategy', NULL, '2026-03-18T10:00:00Z', 8.5, 'active',
     ARRAY['business', 'investors'], '{"version": "v3"}'),
    ('f0000000-0000-0000-0000-000000000012',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000005',
     'AuditorSEC PitchDeck', 'pptx', 'strategy', NULL, '2026-03-19T14:00:00Z', 9.0, 'active',
     ARRAY['investors', 'fundraising'], '{"slides": 22}'),
    ('f0000000-0000-0000-0000-000000000013',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000005',
     'AuditorSEC Investor OnePager', 'pdf', 'strategy', NULL, '2026-03-20T09:00:00Z', 8.0, 'active',
     ARRAY['investors'], '{"pages": 1}'),
    ('f0000000-0000-0000-0000-000000000014',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000005',
     'AuditorSEC Financial Model', 'xlsx', 'strategy', NULL, '2026-03-21T10:00:00Z', 8.5, 'active',
     ARRAY['finance', 'projections'], '{"sheets": 6}');

-- Grants Files (domain: grants)
INSERT INTO files (id, tenant_id, engagement_id, name, type, domain, url, upload_date, priority_score, status, web3_tags, metadata) VALUES
    ('f0000000-0000-0000-0000-000000000015',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001',
     'Track C BRAVE1 Draft', 'docx', 'grants', NULL, '2026-03-22T08:00:00Z', 9.5, 'active',
     ARRAY['BRAVE1', 'defense'], '{"track": "C", "status": "draft"}'),
    ('f0000000-0000-0000-0000-000000000016',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001',
     'Track A Results', 'pdf', 'grants', NULL, '2026-03-23T09:00:00Z', 7.0, 'active',
     ARRAY['BRAVE1', 'defense'], '{"track": "A", "outcome": "pending"}'),
    ('f0000000-0000-0000-0000-000000000017',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001',
     'Track D Results', 'pdf', 'grants', NULL, '2026-03-24T09:00:00Z', 7.0, 'active',
     ARRAY['BRAVE1', 'defense'], '{"track": "D", "outcome": "pending"}');

-- Ops Files (domain: ops)
INSERT INTO files (id, tenant_id, engagement_id, name, type, domain, url, upload_date, priority_score, status, web3_tags, metadata) VALUES
    ('f0000000-0000-0000-0000-000000000018',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'Monday Automations', 'md', 'ops', NULL, '2026-03-25T10:00:00Z', 6.0, 'active',
     ARRAY['CRM', 'monday.com'], '{"platform": "monday.com"}'),
    ('f0000000-0000-0000-0000-000000000019',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'Monday Columns Setup', 'md', 'ops', NULL, '2026-03-25T11:00:00Z', 5.5, 'active',
     ARRAY['CRM'], '{"platform": "monday.com"}'),
    ('f0000000-0000-0000-0000-000000000020',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'Monday Formulas', 'md', 'ops', NULL, '2026-03-25T12:00:00Z', 6.0, 'active',
     ARRAY['CRM', 'risk-scoring'], '{"platform": "monday.com"}'),
    ('f0000000-0000-0000-0000-000000000021',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'ClickUp Risk Register Integration', 'json', 'ops', NULL, '2026-03-26T10:00:00Z', 7.0, 'active',
     ARRAY['ClickUp', 'risk'], '{"platform": "clickup"}'),
    ('f0000000-0000-0000-0000-000000000022',
     'a0000000-0000-0000-0000-000000000001', NULL,
     'Quick Start — Apply All', 'md', 'ops', NULL, '2026-03-27T09:00:00Z', 5.0, 'active',
     ARRAY['setup'], '{"type": "guide"}');

-- Legal/Compliance Files (domain: legal)
INSERT INTO files (id, tenant_id, engagement_id, name, type, domain, url, upload_date, priority_score, status, web3_tags, metadata) VALUES
    ('f0000000-0000-0000-0000-000000000023',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002',
     'corrections-reference.md', 'md', 'legal', NULL, '2026-03-28T10:00:00Z', 6.5, 'active',
     ARRAY['compliance', 'audit'], '{"scope": "internal"}');

-- Security Files (domain: security)
INSERT INTO files (id, tenant_id, engagement_id, name, type, domain, url, upload_date, priority_score, status, web3_tags, metadata) VALUES
    ('f0000000-0000-0000-0000-000000000024',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002',
     'DNSSEC Fix Manual', 'md', 'security', NULL, '2026-03-29T08:00:00Z', 8.0, 'active',
     ARRAY['DNS', 'security', 'DNSSEC'], '{"urgency": "high"}'),
    ('f0000000-0000-0000-0000-000000000025',
     'a0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002',
     'DS Record Management Instructions', 'md', 'security', NULL, '2026-03-29T09:00:00Z', 7.5, 'active',
     ARRAY['DNS', 'DNSSEC'], '{"urgency": "medium"}');

-- ============================================================
-- MEDIA CATALOG — 15 entries for media files
-- ============================================================
INSERT INTO media_catalog (file_id, media_type, project, slide_count, page_count, status) VALUES
    ('f0000000-0000-0000-0000-000000000001', 'pptx', 'AuditorSEC', 18, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000002', 'pptx', 'AuditorSEC', 4, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000003', 'pdf', 'AuditorSEC', NULL, 24, 'active'),
    ('f0000000-0000-0000-0000-000000000004', 'pdf', 'Bakhmach', NULL, 12, 'active'),
    ('f0000000-0000-0000-0000-000000000005', 'pdf', 'AuditorSEC', NULL, 36, 'active'),
    ('f0000000-0000-0000-0000-000000000006', 'pdf', 'UHIP2A', NULL, 42, 'active'),
    ('f0000000-0000-0000-0000-000000000011', 'docx', 'AuditorSEC', NULL, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000012', 'pptx', 'AuditorSEC', 22, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000013', 'pdf', 'AuditorSEC', NULL, 1, 'active'),
    ('f0000000-0000-0000-0000-000000000014', 'docx', 'AuditorSEC', NULL, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000015', 'docx', 'AuditorSEC', NULL, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000016', 'pdf', 'AuditorSEC', NULL, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000017', 'pdf', 'AuditorSEC', NULL, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000024', 'pdf', 'AuditorSEC', NULL, NULL, 'active'),
    ('f0000000-0000-0000-0000-000000000025', 'pdf', 'AuditorSEC', NULL, NULL, 'active');

-- ============================================================
-- AUTOMATIONS — sample automation records
-- ============================================================
INSERT INTO automations (trigger_type, action_type, n8n_workflow_id, webhook_url, is_active, metadata) VALUES
    ('monday_update', 'n8n_workflow', 'wf-monday-risk-001', 'https://n8n.auditorsec.io/webhook/monday-risk', TRUE,
     '{"description": "Monday.com risk score update triggers n8n workflow"}'),
    ('ci_cd_event', 'telegram_notify', 'wf-cicd-notify-001', 'https://n8n.auditorsec.io/webhook/ci-cd', TRUE,
     '{"description": "CI/CD deploy events notify via Telegram"}'),
    ('grafana_alert', 'telegram_notify', 'wf-grafana-alert-001', 'https://n8n.auditorsec.io/webhook/grafana', TRUE,
     '{"description": "Grafana alerts forwarded to Telegram"}'),
    ('file_upload', 'classify_file', 'wf-file-classify-001', 'https://n8n.auditorsec.io/webhook/file-classify', TRUE,
     '{"description": "Auto-classify uploaded files"}'),
    ('prozorro_tender', 'risk_score_update', 'wf-prozorro-001', 'https://n8n.auditorsec.io/webhook/prozorro', TRUE,
     '{"description": "Prozorro tender monitoring for RehabFund"}');

-- ============================================================
-- RISK EVENTS — sample data for demonstration
-- ============================================================
INSERT INTO risk_events (engagement_id, entity_type, entity_ref, risk_category, severity, impact, description, source, resolved, metadata) VALUES
    ('e0000000-0000-0000-0000-000000000004', 'project', 'UHIP2A-001', 'cyber', 4, 4,
     'Unpatched PQC migration in production SSL certs', 'ai_agent', FALSE,
     '{"indicator": "ssl-cert-expiry", "affected_domains": ["auditorsec.io"]}'),
    ('e0000000-0000-0000-0000-000000000002', 'contract', 'NIS2-INFRA-01', 'compliance', 3, 4,
     'NIS2 Article 21 compliance gap in incident reporting', 'manual', FALSE,
     '{"article": "21", "gap": "reporting-timeline"}'),
    ('e0000000-0000-0000-0000-000000000003', 'tender', 'PROZORRO-2026-001', 'corruption', 5, 3,
     'Suspicious pricing pattern in Bakhmach energy tender', 'prozorro', FALSE,
     '{"tender_id": "UA-2026-03-15-000123", "anomaly": "price-deviation"}'),
    ('e0000000-0000-0000-0000-000000000001', 'project', 'BRAVE1-TRACK-C', 'technical', 2, 3,
     'BRAVE1 Track C application missing required technical annexes', 'manual', FALSE,
     '{"missing": ["annex-b", "annex-d"], "deadline": "2026-06-01"}'),
    ('e0000000-0000-0000-0000-000000000005', 'counterparty', 'INVESTOR-DD-01', 'financial', 3, 3,
     'Due diligence pending on lead investor background', 'manual', FALSE,
     '{"stage": "pre-seed", "check": "KYC/AML"}'),
    ('e0000000-0000-0000-0000-000000000004', 'transaction', 'DEFI-BRIDGE-001', 'cyber', 5, 5,
     'Critical vulnerability in DeFi bridge smart contract audit', 'ai_agent', FALSE,
     '{"contract": "0xABC...DEF", "vulnerability": "reentrancy", "cvss": 9.8}');

-- ============================================================
-- REFRESH MATERIALIZED VIEWS after seed
-- ============================================================
REFRESH MATERIALIZED VIEW active_media;
REFRESH MATERIALIZED VIEW high_risk_dashboard;
REFRESH MATERIALIZED VIEW file_inventory;

COMMIT;
