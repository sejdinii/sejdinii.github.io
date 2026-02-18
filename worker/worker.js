// ═══════════════════════════════════════════════════════════════
// Cloudflare Worker — API Proxy for CV Chatbot
// This hides your Groq API key from the frontend
// ═══════════════════════════════════════════════════════════════

// Your allowed origin (update after deploying GitHub Pages)
const ALLOWED_ORIGINS = [
  'https://sejdinii.github.io',        // GitHub Pages
  'http://localhost:3000',              // Local dev
  'http://127.0.0.1:5500',             // VS Code Live Server
  'null'                                // Local file:// protocol
];

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Check origin
    const origin = request.headers.get('Origin') || '';
    if (!ALLOWED_ORIGINS.includes(origin) && !origin.includes('github.io')) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      // Get the request body from frontend
      const body = await request.json();

      // Forward to Groq API with the secret key
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: body.model || 'llama-3.3-70b-versatile',
          messages: body.messages || [],
          max_tokens: body.max_tokens || 500,
          temperature: body.temperature || 0.7,
        }),
      });

      const data = await groqResponse.json();

      // Return response with CORS headers
      return new Response(JSON.stringify(data), {
        status: groqResponse.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy error: ' + err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
        },
      });
    }
  },
};

function handleCORS(request) {
  const origin = request.headers.get('Origin') || '';
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
