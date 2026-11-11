// Talks to the Express server. Always resolves to an object (never throws).
// During development "/api" is proxied to http://localhost:5001 (see vite.config.js).
// If your website and API are hosted on different domains, set VITE_API_URL in a .env file.
const BASE = import.meta.env.VITE_API_URL || '';

export async function submitRegistration(payload) {
  try {
    const res = await fetch(`${BASE}/api/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data = null;
    try { data = await res.json(); } catch { /* not JSON */ }
    if (data && data.status) return { httpStatus: res.status, ...data };
    return { ok: false, status: 'server_error', httpStatus: res.status, message: 'The server sent an unexpected reply. Please try again.' };
  } catch {
    return { ok: false, status: 'network_error', message: "Couldn't reach the server. Check your internet connection and try again." };
  }
}
