// Cloudflare Worker with Hyperdrive for public read-only API
// Uses Hyperdrive connection pooling + caching for Railway Postgres

import { Client } from 'pg';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const ROUTES = {
  '/api/public/files': {
    query: `SELECT id, name, type, domain, web3_tags, priority_score, upload_date, status
            FROM files WHERE status = 'active'
            ORDER BY priority_score DESC LIMIT 100`,
    filters: { domain: "AND domain = $1", project: "AND metadata->>'project' = $1" },
  },
  '/api/public/intelligence': {
    query: `SELECT company_name, source, data_type, location, funding_total,
                   status, relevance_score, fetched_at
            FROM competitive_intelligence ORDER BY relevance_score DESC LIMIT 50`,
  },
  '/api/public/notebooks': {
    query: `SELECT nc.notebook_id, nc.notebook_url, nc.sync_status,
                   f.name, f.domain, f.web3_tags
            FROM notebook_catalog nc LEFT JOIN files f ON nc.file_id = f.id
            ORDER BY nc.last_synced_at DESC NULLS LAST`,
  },
  '/api/public/media': {
    query: `SELECT id, original_filename, media_type, domain, project_tag,
                   storage_url, processing_status, created_at
            FROM media_catalog WHERE processing_status = 'ready'
            ORDER BY created_at DESC LIMIT 100`,
  },
  '/api/public/stats': {
    query: `SELECT * FROM file_inventory`,
  },
  '/api/public/risk-dashboard': {
    query: `SELECT * FROM high_risk_dashboard`,
  },
};

async function handleQuery(env, route, url) {
  const client = new Client(env.HYPERDRIVE.connectionString);
  await client.connect();
  try {
    let { query } = route;
    const params = [];
    if (route.filters) {
      for (const [param, clause] of Object.entries(route.filters)) {
        const val = url.searchParams.get(param);
        if (val) {
          params.push(val);
          query = query.replace('ORDER BY', `${clause} ORDER BY`);
        }
      }
    }
    const result = await client.query(query, params);
    return { data: result.rows, count: result.rowCount };
  } finally {
    await client.end();
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Health check
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', service: 'audityzer-public-api' }), { headers: CORS });
    }

    // API index
    if (path === '/' || path === '/api' || path === '/api/public') {
      return new Response(JSON.stringify({
        service: 'AuditorSEC Open Data API',
        version: '1.0.0',
        endpoints: Object.keys(ROUTES),
        docs: 'https://audityzer.com/api/docs',
      }), { headers: CORS });
    }

    const route = ROUTES[path];
    if (!route) {
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: CORS });
    }

    try {
      const result = await handleQuery(env, route, url);
      return new Response(JSON.stringify(result), { headers: CORS });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Database error', message: err.message }), { status: 500, headers: CORS });
    }
  },
};
