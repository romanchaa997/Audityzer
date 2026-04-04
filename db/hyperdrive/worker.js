// Cloudflare Worker with Hyperdrive for public read access
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow GET requests for public access
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({error: 'Method not allowed'}), {status: 405, headers: corsHeaders});
    }

    const db = env.HYPERDRIVE.connectionString;

    // Route handler
    const path = url.pathname;
    let query, params;

    if (path === '/api/public/files') {
      const domain = url.searchParams.get('domain');
      const project = url.searchParams.get('project');
      query = `SELECT id, name, type, domain, web3_tags, priority_score, upload_date
               FROM files WHERE status = 'active'
               ${domain ? "AND domain = $1" : ""}
               ${project ? "AND metadata->>'project' = $2" : ""}
               ORDER BY priority_score DESC LIMIT 100`;
    } else if (path === '/api/public/intelligence') {
      query = `SELECT company_name, source, data_type, location, funding_total, status, relevance_score
               FROM competitive_intelligence ORDER BY relevance_score DESC LIMIT 50`;
    } else if (path === '/api/public/notebooks') {
      query = `SELECT nc.notebook_id, f.name, f.domain, f.web3_tags, nc.sync_status
               FROM notebook_catalog nc JOIN files f ON nc.file_id = f.id
               ORDER BY f.priority_score DESC`;
    } else if (path === '/api/public/stats') {
      query = `SELECT * FROM file_inventory`;
    } else {
      return new Response(JSON.stringify({
        service: 'AuditorSEC Open Data API',
        endpoints: ['/api/public/files', '/api/public/intelligence', '/api/public/notebooks', '/api/public/stats']
      }), {headers: corsHeaders});
    }

    // Execute via Hyperdrive (connection pooling + caching)
    // In production, use pg driver with Hyperdrive connection string
    return new Response(JSON.stringify({
      endpoint: path,
      query: query,
      note: 'Connect pg driver to env.HYPERDRIVE.connectionString for live data'
    }), {headers: corsHeaders});
  }
};
