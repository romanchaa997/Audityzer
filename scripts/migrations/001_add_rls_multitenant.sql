-- ============================================================
-- Migration: 001_add_rls_multitenant.sql
-- Description: Add tenant_id column and Row Level Security (RLS)
--              to all tables for multi-tenant isolation in Audityzer
-- Author: rigoryanych / AuditorSEC
-- Date: 2026-04-10
-- ============================================================

BEGIN;

-- ============================================================
-- STEP 1: Add tenant_id column to all tables
-- ============================================================

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS tenant_id UUID NOT NULL DEFAULT uuid_generate_v4();

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE audit_reports
  ADD COLUMN IF NOT EXISTS tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE analytics
  ADD COLUMN IF NOT EXISTS tenant_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

-- ============================================================
-- STEP 2: Create indexes on tenant_id for performance
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_users_tenant_id       ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_projects_tenant_id    ON projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_reports_tenant  ON audit_reports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_tenant_id   ON analytics(tenant_id);

-- ============================================================
-- STEP 3: Create helper function current_tenant_id()
-- Sets tenant from session variable: SET app.tenant_id = '<uuid>'
-- ============================================================

CREATE OR REPLACE FUNCTION current_tenant_id()
RETURNS UUID
LANGUAGE sql STABLE
AS $$
  SELECT NULLIF(current_setting('app.tenant_id', true), '')::UUID;
$$;

-- ============================================================
-- STEP 4: Enable RLS on all tables
-- ============================================================

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports  ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics      ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owners (super-important for multi-tenant!)
ALTER TABLE users          FORCE ROW LEVEL SECURITY;
ALTER TABLE projects       FORCE ROW LEVEL SECURITY;
ALTER TABLE audit_reports  FORCE ROW LEVEL SECURITY;
ALTER TABLE analytics      FORCE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 5: Create RLS Policies
-- ============================================================

-- USERS table
DROP POLICY IF EXISTS users_tenant_isolation ON users;
CREATE POLICY users_tenant_isolation ON users
  USING (tenant_id = current_tenant_id())
  WITH CHECK (tenant_id = current_tenant_id());

-- PROJECTS table
DROP POLICY IF EXISTS projects_tenant_isolation ON projects;
CREATE POLICY projects_tenant_isolation ON projects
  USING (tenant_id = current_tenant_id())
  WITH CHECK (tenant_id = current_tenant_id());

-- AUDIT_REPORTS table
DROP POLICY IF EXISTS audit_reports_tenant_isolation ON audit_reports;
CREATE POLICY audit_reports_tenant_isolation ON audit_reports
  USING (tenant_id = current_tenant_id())
  WITH CHECK (tenant_id = current_tenant_id());

-- ANALYTICS table
DROP POLICY IF EXISTS analytics_tenant_isolation ON analytics;
CREATE POLICY analytics_tenant_isolation ON analytics
  USING (tenant_id = current_tenant_id())
  WITH CHECK (tenant_id = current_tenant_id());

-- ============================================================
-- STEP 6: Admin bypass role (service account)
-- CREATE ROLE audityzer_service BYPASSRLS;
-- GRANT audityzer_service TO your_app_user;
-- ============================================================

-- ============================================================
-- STEP 7: Update existing rows to share admin tenant
-- (backfill: projects/reports/analytics linked to admin user)
-- ============================================================

UPDATE projects p
  SET tenant_id = u.tenant_id
  FROM users u
  WHERE p.user_id = u.id
    AND p.tenant_id = '00000000-0000-0000-0000-000000000000';

UPDATE audit_reports ar
  SET tenant_id = p.tenant_id
  FROM projects p
  WHERE ar.project_id = p.id
    AND ar.tenant_id = '00000000-0000-0000-0000-000000000000';

UPDATE analytics a
  SET tenant_id = u.tenant_id
  FROM users u
  WHERE a.user_id = u.id
    AND a.tenant_id = '00000000-0000-0000-0000-000000000000';

COMMIT;

-- ============================================================
-- HOW TO USE (application layer):
-- Before each request set the tenant context:
--   SET LOCAL app.tenant_id = '<tenant-uuid>';
-- The RLS policies will automatically filter all queries.
-- For service/admin operations use BYPASSRLS role.
-- ============================================================
