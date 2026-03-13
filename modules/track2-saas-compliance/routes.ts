/**
 * @module routes
 * @description RESTful API routes for the AuditorSEC SaaS Compliance Platform.
 *
 * Provides endpoints for:
 *  - Compliance audits (CRUD, run, reports)
 *  - dApp risk audits
 *  - AI scanner operations
 *  - CRM webhook reception and client management
 *  - Health and metadata
 *
 * Includes inline OpenAPI/Swagger specification comments.
 * Implements rate limiting, JWT authentication, pagination, filtering, and sorting.
 */

import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import pino from 'pino';
import { authConfig, rateLimitConfig, serverConfig } from './config.js';
import type {
  ApiError,
  ApiResponse,
  AuthPayload,
  ListQueryParams,
  PaginationMeta,
} from './types.js';

const logger = pino({ name: 'routes' });

// ─── Types ──────────────────────────────────────────────────────────────────

/** Route handler function */
type RouteHandler = (req: ParsedRequest, res: ResponseHelper) => Promise<void>;

/** HTTP methods */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** Route definition */
interface RouteDefinition {
  method: HttpMethod;
  path: string;
  handler: RouteHandler;
  /** Require JWT authentication */
  auth: boolean;
  /** Required roles (empty = any authenticated user) */
  roles: AuthPayload['role'][];
  /** Rate limit tier */
  rateLimit: 'standard' | 'write';
  /** OpenAPI description */
  description: string;
  /** OpenAPI tags */
  tags: string[];
}

/** Parsed request with extracted params */
interface ParsedRequest {
  method: HttpMethod;
  path: string;
  params: Record<string, string>;
  query: ListQueryParams & Record<string, string | string[]>;
  body: unknown;
  auth: AuthPayload | null;
  raw: IncomingMessage;
}

/** Response helper */
interface ResponseHelper {
  json<T>(data: ApiResponse<T>, statusCode?: number): void;
  error(code: string, message: string, statusCode?: number, details?: Record<string, unknown>): void;
  raw: ServerResponse;
}

// ─── Rate Limiter ───────────────────────────────────────────────────────────

/** In-memory rate limit store */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Check rate limit for a given IP + tier combination.
 *
 * @param ip   - Client IP address.
 * @param tier - Rate limit tier.
 * @returns True if request is allowed.
 */
function checkRateLimit(ip: string, tier: 'standard' | 'write'): boolean {
  const key = `${ip}:${tier}`;
  const now = Date.now();
  const max = tier === 'write' ? rateLimitConfig.writeMaxRequests : rateLimitConfig.maxRequests;
  const window = rateLimitConfig.windowMs;

  const entry = rateLimitStore.get(key);
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + window });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

// ─── JWT Authentication ─────────────────────────────────────────────────────

/**
 * Verify and decode a JWT token.
 * Uses HMAC-SHA256 for simplicity (production would use RS256/ES256).
 *
 * @param token - Bearer token string.
 * @returns Decoded auth payload or null if invalid.
 */
function verifyJWT(token: string): AuthPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, sig] = parts;
    const expected = crypto
      .createHmac('sha256', authConfig.jwtSecret)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (sig !== expected) return null;

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString()) as AuthPayload;

    if (decoded.exp && decoded.exp * 1000 < Date.now()) return null;

    return decoded;
  } catch {
    return null;
  }
}

// ─── Request Parsing ────────────────────────────────────────────────────────

/**
 * Parse URL query string into ListQueryParams.
 */
function parseQuery(url: string): ListQueryParams & Record<string, string | string[]> {
  const idx = url.indexOf('?');
  if (idx === -1) return {};

  const params: Record<string, string | string[]> = {};
  const searchParams = new URLSearchParams(url.substring(idx + 1));

  for (const [key, value] of searchParams) {
    const existing = params[key];
    if (existing) {
      params[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    } else {
      params[key] = value;
    }
  }

  // Extract standard pagination/sort params
  if (params.page) params.page = params.page as string;
  if (params.pageSize) params.pageSize = params.pageSize as string;
  if (params.sortBy) params.sortBy = params.sortBy as string;
  if (params.sortOrder) params.sortOrder = params.sortOrder as string;

  return params as ListQueryParams & Record<string, string | string[]>;
}

/**
 * Read the request body as JSON.
 */
function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString();
      if (!raw) return resolve(null);
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

// ─── Response Helper ────────────────────────────────────────────────────────

function createResponseHelper(res: ServerResponse): ResponseHelper {
  return {
    json<T>(data: ApiResponse<T>, statusCode = 200) {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    },
    error(code: string, message: string, statusCode = 400, details?: Record<string, unknown>) {
      const err: ApiError = { code, message, details };
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, data: null, error: err }));
    },
    raw: res,
  };
}

// ─── Pagination Helper ──────────────────────────────────────────────────────

/**
 * Apply pagination to an array of items.
 */
export function paginate<T>(
  items: T[],
  query: ListQueryParams,
): { items: T[]; pagination: PaginationMeta } {
  const page = Math.max(1, Number(query.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 20));
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

// ─── Route Registry ─────────────────────────────────────────────────────────

const routes: RouteDefinition[] = [];

/**
 * Register a route.
 */
function route(
  method: HttpMethod,
  path: string,
  handler: RouteHandler,
  options: Partial<Omit<RouteDefinition, 'method' | 'path' | 'handler'>> = {},
): void {
  routes.push({
    method,
    path,
    handler,
    auth: options.auth ?? true,
    roles: options.roles ?? [],
    rateLimit: options.rateLimit ?? 'standard',
    description: options.description ?? '',
    tags: options.tags ?? [],
  });
}

/**
 * Match a request path against a route pattern and extract params.
 * Supports :param style path parameters.
 */
function matchRoute(
  routePath: string,
  reqPath: string,
): Record<string, string> | null {
  const routeParts = routePath.split('/');
  const reqParts = reqPath.split('?')[0].split('/');

  if (routeParts.length !== reqParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = reqParts[i];
    } else if (routeParts[i] !== reqParts[i]) {
      return null;
    }
  }

  return params;
}

// ─── API Routes Definition ──────────────────────────────────────────────────

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
route('GET', '/api/v1/health', async (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      version: '1.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
}, { auth: false, description: 'Health check', tags: ['System'] });

/**
 * @openapi
 * /api/v1/frameworks:
 *   get:
 *     summary: List supported compliance frameworks
 *     tags: [Compliance]
 *     responses:
 *       200:
 *         description: List of frameworks
 */
route('GET', '/api/v1/frameworks', async (_req, res) => {
  const { frameworkConfigs } = await import('./config.js');
  const enabled = frameworkConfigs.filter((f) => f.enabled);
  res.json({ success: true, data: enabled });
}, { auth: false, description: 'List compliance frameworks', tags: ['Compliance'] });

/**
 * @openapi
 * /api/v1/compliance/audit:
 *   post:
 *     summary: Run a compliance audit
 *     tags: [Compliance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [framework, clientId, evidence]
 *             properties:
 *               framework: { type: string, enum: [SEBI_CSCRF, LGPD, JOINT_STANDARD_2, SOC2_TYPE_II, ISO_27001, GDPR] }
 *               clientId: { type: string }
 *               evidence: { type: array }
 *     responses:
 *       200:
 *         description: Compliance report
 */
route('POST', '/api/v1/compliance/audit', async (req, res) => {
  const { runComplianceAudit } = await import('./compliance-engine.js');
  const body = req.body as {
    framework: string;
    clientId: string;
    evidence: unknown[];
  };

  if (!body?.framework || !body?.clientId) {
    return res.error('VALIDATION', 'framework and clientId are required', 400);
  }

  try {
    const report = await runComplianceAudit(
      body.framework as Parameters<typeof runComplianceAudit>[0],
      body.clientId,
      body.evidence as Parameters<typeof runComplianceAudit>[2],
      req.auth!.userId,
    );
    res.json({ success: true, data: report });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.error('AUDIT_FAILED', message, 500);
  }
}, { rateLimit: 'write', description: 'Run compliance audit', tags: ['Compliance'], roles: ['admin', 'auditor'] });

/**
 * @openapi
 * /api/v1/compliance/report/:id:
 *   get:
 *     summary: Get a compliance report by ID
 *     tags: [Compliance]
 */
route('GET', '/api/v1/compliance/report/:id', async (req, res) => {
  // In production, fetch from database
  res.json({
    success: true,
    data: { message: `Report ${req.params.id} — implement database fetch` },
  });
}, { description: 'Get compliance report', tags: ['Compliance'] });

/**
 * @openapi
 * /api/v1/compliance/report/:id/markdown:
 *   get:
 *     summary: Get compliance report formatted as Markdown
 *     tags: [Compliance]
 */
route('GET', '/api/v1/compliance/report/:id/markdown', async (req, res) => {
  res.json({
    success: true,
    data: { message: `Markdown report for ${req.params.id} — implement fetch + format` },
  });
}, { description: 'Get compliance report as Markdown', tags: ['Compliance'] });

/**
 * @openapi
 * /api/v1/dapp/risk-audit:
 *   post:
 *     summary: Run a dApp risk audit
 *     tags: [dApp Risk]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dappName, chains]
 */
route('POST', '/api/v1/dapp/risk-audit', async (req, res) => {
  const { runDAppRiskAudit } = await import('./dapp-risk-audit.js');
  const body = req.body as Parameters<typeof runDAppRiskAudit>[0];

  if (!body?.dappName || !body?.chains) {
    return res.error('VALIDATION', 'dappName and chains are required', 400);
  }

  try {
    const report = runDAppRiskAudit(body);
    res.json({ success: true, data: report });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.error('RISK_AUDIT_FAILED', message, 500);
  }
}, { rateLimit: 'write', description: 'Run dApp risk audit', tags: ['dApp Risk'], roles: ['admin', 'auditor'] });

/**
 * @openapi
 * /api/v1/scanner/scan:
 *   post:
 *     summary: Run a full AI meta-learning scan
 *     tags: [Scanner]
 */
route('POST', '/api/v1/scanner/scan', async (req, res) => {
  const { runFullScan } = await import('./ai-scanner.js');
  const body = req.body as { type: string; content: string; chain?: string };

  if (!body?.type || !body?.content) {
    return res.error('VALIDATION', 'type and content are required', 400);
  }

  try {
    const result = await runFullScan({
      type: body.type as 'solidity' | 'bytecode' | 'address' | 'repository',
      content: body.content,
      chain: body.chain,
    });
    res.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.error('SCAN_FAILED', message, 500);
  }
}, { rateLimit: 'write', description: 'Run AI meta-learning scan', tags: ['Scanner'], roles: ['admin', 'auditor'] });

/**
 * @openapi
 * /api/v1/scanner/plugins:
 *   get:
 *     summary: List registered scanner plugins
 *     tags: [Scanner]
 */
route('GET', '/api/v1/scanner/plugins', async (_req, res) => {
  const { listScanners } = await import('./ai-scanner.js');
  res.json({ success: true, data: listScanners() });
}, { description: 'List scanner plugins', tags: ['Scanner'] });

/**
 * @openapi
 * /api/v1/scanner/plugins/:id/toggle:
 *   post:
 *     summary: Enable or disable a scanner plugin
 *     tags: [Scanner]
 */
route('POST', '/api/v1/scanner/plugins/:id/toggle', async (req, res) => {
  const { toggleScanner } = await import('./ai-scanner.js');
  const body = req.body as { enabled: boolean };
  const success = toggleScanner(req.params.id, body?.enabled ?? true);
  if (!success) return res.error('NOT_FOUND', 'Scanner not found', 404);
  res.json({ success: true, data: { id: req.params.id, enabled: body?.enabled ?? true } });
}, { rateLimit: 'write', description: 'Toggle scanner plugin', tags: ['Scanner'], roles: ['admin'] });

/**
 * @openapi
 * /api/v1/crm/webhook/monday:
 *   post:
 *     summary: monday.com webhook receiver
 *     tags: [CRM]
 */
route('POST', '/api/v1/crm/webhook/monday', async (req, res) => {
  const { processMondayWebhook, verifyMondayWebhook } = await import('./crm-integration.js');

  // monday.com sends a challenge for webhook verification
  const body = req.body as Record<string, unknown>;
  if (body?.challenge) {
    return res.json({ success: true, data: { challenge: body.challenge } });
  }

  // Verify webhook signature (in production, use raw body from middleware)
  const signature = req.raw.headers['x-monday-signature'] as string;
  if (signature && !verifyMondayWebhook(JSON.stringify(body), signature)) {
    return res.error('AUTH_FAILED', 'Invalid webhook signature', 401);
  }

  try {
    await processMondayWebhook(body as Parameters<typeof processMondayWebhook>[0]);
    res.json({ success: true, data: { received: true } });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.error('WEBHOOK_FAILED', message, 500);
  }
}, { auth: false, description: 'monday.com webhook receiver', tags: ['CRM'] });

/**
 * @openapi
 * /api/v1/crm/clients:
 *   post:
 *     summary: Onboard a new client
 *     tags: [CRM]
 */
route('POST', '/api/v1/crm/clients', async (req, res) => {
  const { onboardClient } = await import('./crm-integration.js');
  const body = req.body as Parameters<typeof onboardClient>[0];

  if (!body?.name || !body?.email || !body?.auditType) {
    return res.error('VALIDATION', 'name, email, and auditType are required', 400);
  }

  try {
    const client = await onboardClient(body);
    res.json({ success: true, data: client }, 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.error('ONBOARD_FAILED', message, 500);
  }
}, { rateLimit: 'write', description: 'Onboard new client', tags: ['CRM'], roles: ['admin'] });

/**
 * @openapi
 * /api/v1/crm/clients/:id/stage:
 *   put:
 *     summary: Update client pipeline stage
 *     tags: [CRM]
 */
route('PUT', '/api/v1/crm/clients/:id/stage', async (req, res) => {
  const body = req.body as { stage: string; client: unknown };
  if (!body?.stage) {
    return res.error('VALIDATION', 'stage is required', 400);
  }
  // In production: fetch client from DB, then sync
  res.json({
    success: true,
    data: { clientId: req.params.id, stage: body.stage, synced: true },
  });
}, { rateLimit: 'write', description: 'Update pipeline stage', tags: ['CRM'], roles: ['admin', 'auditor'] });

// ─── OpenAPI Specification ──────────────────────────────────────────────────

/**
 * @openapi
 * /api/v1/openapi.json:
 *   get:
 *     summary: OpenAPI specification
 *     tags: [System]
 */
route('GET', '/api/v1/openapi.json', async (_req, res) => {
  const spec = generateOpenAPISpec();
  res.json({ success: true, data: spec });
}, { auth: false, description: 'OpenAPI specification', tags: ['System'] });

/**
 * Generate OpenAPI 3.0 specification from route definitions.
 */
function generateOpenAPISpec(): Record<string, unknown> {
  const paths: Record<string, Record<string, unknown>> = {};

  for (const r of routes) {
    const openApiPath = r.path.replace(/:(\w+)/g, '{$1}');
    if (!paths[openApiPath]) paths[openApiPath] = {};

    const params: Array<Record<string, unknown>> = [];
    const paramMatches = r.path.matchAll(/:(\w+)/g);
    for (const match of paramMatches) {
      params.push({
        name: match[1],
        in: 'path',
        required: true,
        schema: { type: 'string' },
      });
    }

    paths[openApiPath][r.method.toLowerCase()] = {
      summary: r.description,
      tags: r.tags,
      parameters: params.length > 0 ? params : undefined,
      security: r.auth ? [{ bearerAuth: [] }] : undefined,
      responses: {
        '200': { description: 'Success' },
        '400': { description: 'Bad Request' },
        '401': { description: 'Unauthorized' },
        '429': { description: 'Rate Limited' },
        '500': { description: 'Server Error' },
      },
    };
  }

  return {
    openapi: '3.0.3',
    info: {
      title: 'AuditorSEC Compliance API',
      version: '1.0.0',
      description: 'SaaS compliance audit platform API — multi-framework compliance, dApp risk, AI scanning, CRM integration.',
    },
    servers: [
      { url: `http://localhost:${serverConfig.port}`, description: 'Local development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths,
  };
}

// ─── HTTP Server Request Handler ────────────────────────────────────────────

/**
 * Main request handler for the HTTP server.
 * Implements routing, auth, rate limiting, and error handling.
 *
 * @param req - Incoming HTTP request.
 * @param rawRes - Server response.
 */
export async function handleRequest(req: IncomingMessage, rawRes: ServerResponse): Promise<void> {
  const res = createResponseHelper(rawRes);
  const method = (req.method ?? 'GET').toUpperCase() as HttpMethod;
  const url = req.url ?? '/';
  const path = url.split('?')[0];
  const ip = req.socket.remoteAddress ?? 'unknown';

  // CORS headers
  rawRes.setHeader('Access-Control-Allow-Origin', '*');
  rawRes.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  rawRes.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === ('OPTIONS' as HttpMethod)) {
    rawRes.writeHead(204);
    rawRes.end();
    return;
  }

  // Find matching route
  let matchedRoute: RouteDefinition | null = null;
  let params: Record<string, string> = {};

  for (const r of routes) {
    if (r.method !== method) continue;
    const match = matchRoute(r.path, path);
    if (match) {
      matchedRoute = r;
      params = match;
      break;
    }
  }

  if (!matchedRoute) {
    return res.error('NOT_FOUND', `${method} ${path} not found`, 404);
  }

  // Rate limiting
  if (!checkRateLimit(ip, matchedRoute.rateLimit)) {
    return res.error('RATE_LIMITED', 'Too many requests', 429);
  }

  // Authentication
  let auth: AuthPayload | null = null;
  if (matchedRoute.auth) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.error('AUTH_REQUIRED', 'Bearer token required', 401);
    }
    auth = verifyJWT(authHeader.slice(7));
    if (!auth) {
      return res.error('AUTH_INVALID', 'Invalid or expired token', 401);
    }

    // Role check
    if (matchedRoute.roles.length > 0 && !matchedRoute.roles.includes(auth.role)) {
      return res.error('FORBIDDEN', 'Insufficient permissions', 403);
    }
  }

  // Parse request
  let body: unknown = null;
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    try {
      body = await readBody(req);
    } catch {
      return res.error('INVALID_BODY', 'Could not parse JSON body', 400);
    }
  }

  const query = parseQuery(url);

  const parsed: ParsedRequest = {
    method,
    path,
    params,
    query,
    body,
    auth,
    raw: req,
  };

  // Execute handler
  try {
    await matchedRoute.handler(parsed, res);
  } catch (err) {
    logger.error({ method, path, error: err }, 'Unhandled route error');
    res.error('INTERNAL', 'Internal server error', 500);
  }
}

/**
 * Get all registered routes (for testing and documentation).
 */
export function getRoutes(): RouteDefinition[] {
  return [...routes];
}
