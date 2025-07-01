
export default async (request, context) => {
  const response = await context.next();
  
  // Security headers for all responses
  const securityHeaders = {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Cross-Origin-Embedder-Policy': 'credentialless',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin'
  };
  
  // Enhanced CSP for different content types
  const url = new URL(request.url);
  const isAPI = url.pathname.startsWith('/api/');
  const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|eot)$/i.test(url.pathname);
  
  let csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
    connect-src 'self' https: wss: ws:;
    media-src 'self' data: blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim();
  
  if (isAPI) {
    // More restrictive CSP for API endpoints
    csp = "default-src 'none'; script-src 'none'; object-src 'none';";
  }
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  response.headers.set('Content-Security-Policy', csp);
  
  // Performance headers
  if (isAsset) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Rate limiting headers (basic implementation)
  const clientIP = request.headers.get('CF-Connecting-IP') || 
                   request.headers.get('X-Forwarded-For') || 
                   'unknown';
  
  response.headers.set('X-RateLimit-Limit', '1000');
  response.headers.set('X-RateLimit-Remaining', '999');
  response.headers.set('X-RateLimit-Reset', Math.floor(Date.now() / 1000) + 3600);
  
  return response;
};
