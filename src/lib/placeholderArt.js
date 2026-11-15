// Generated placeholder pictures (no files needed). Clearly marked as placeholders.
export function artSVG(i) {
  const P = [['#66764b', '#0b130d', '#c7a95e'], ['#a7ae7e', '#0b130d', '#344633'], ['#344633', '#060906', '#66764b'], ['#c7a95e', '#0b130d', '#a7ae7e']][i % 4];
  const r = (n) => { const x = Math.sin(i * 97.13 + n * 12.9898) * 43758.5453; return x - Math.floor(x); };
  let sh = '';
  for (let k = 0; k < 6; k++) sh += `<circle cx="${r(k) * 800}" cy="${r(k + 9) * 600}" r="${40 + r(k + 3) * 150}" fill="${P[k % 3]}" opacity="${0.22 + r(k + 5) * 0.4}"/>`;
  for (let k = 0; k < 3; k++) { const x = r(k + 20) * 700, y = r(k + 30) * 450; sh += `<polygon points="${x},${y} ${x + 160 + r(k) * 80},${y + 30} ${x + 60},${y + 170 + r(k) * 60}" fill="${P[(k + 1) % 3]}" opacity=".5"/>`; }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P[1]}"/><stop offset="1" stop-color="#060906"/></linearGradient><pattern id="h" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.6" fill="#fff" opacity=".14"/></pattern></defs><rect width="800" height="600" fill="url(#g)"/>${sh}<rect width="800" height="600" fill="url(#h)"/><rect x="20" y="20" width="760" height="560" fill="none" stroke="#e9e6d8" stroke-opacity=".5" stroke-width="3"/><text x="400" y="545" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#c7a95e">PLACEHOLDER · ADD REAL ARTOPIA 2.0 PHOTO</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function silhouette(n) {
  const c = ['#66764b', '#a7ae7e', '#c7a95e'][n % 3];
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1240"/><stop offset="1" stop-color="#060906"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="150" r="64" fill="${c}" opacity=".7"/><path d="M60 400c0-90 60-140 140-140s140 50 140 140z" fill="${c}" opacity=".55"/></svg>`);
}

export const ART = {
  painting: `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M30 130c-10-40 20-85 70-90s80 30 70 70c-6 24-30 20-40 14-14-8-30 10-20 28 6 12-16 22-44 12-20-8-30-20-36-34z" fill="currentColor" fill-opacity=".14"/><circle cx="70" cy="85" r="10" fill="#66764b" stroke="none"/><circle cx="105" cy="68" r="10" fill="#c7a95e" stroke="none"/><circle cx="140" cy="90" r="10" fill="#a7ae7e" stroke="none"/><circle cx="62" cy="122" r="10" fill="#344633" stroke="none"/><path d="M118 152l54-64 9 8-52 66z" fill="currentColor" stroke="none"/></svg>`,
  trophy: `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><circle cx="100" cy="100" r="82" stroke-dasharray="4 8"/><circle cx="100" cy="100" r="64"/><polygon points="100,38 116,82 162,84 126,112 138,156 100,130 62,156 74,112 38,84 84,82" fill="currentColor" fill-opacity=".25"/></svg>`,
  frame: `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><rect x="26" y="46" width="96" height="116" fill="currentColor" fill-opacity=".08"/><rect x="38" y="58" width="72" height="92"/><path d="M38 134l24-30 18 20 12-14 18 24"/><circle cx="90" cy="82" r="8"/><rect x="104" y="30" width="74" height="96" fill="#060906"/><rect x="114" y="40" width="54" height="76"/><path d="M114 100l20-24 16 18"/></svg>`,
  nodes: `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="22" fill="currentColor" fill-opacity=".3"/><circle cx="100" cy="100" r="44" stroke-dasharray="3 7"/><circle cx="100" cy="100" r="72" stroke-dasharray="3 9"/><path d="M100 78V40M118 112l34 24M82 112l-34 24M122 92l44-16"/><circle cx="100" cy="36" r="9" fill="currentColor"/><circle cx="156" cy="140" r="9" fill="currentColor"/><circle cx="44" cy="140" r="9" fill="currentColor"/><circle cx="170" cy="72" r="9" fill="currentColor"/></svg>`,
  stall: `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M28 72h144l12 38H16z" fill="currentColor" fill-opacity=".2"/><path d="M16 110q14 22 28 0q14 22 28 0q14 22 28 0q14 22 28 0q14 22 28 0q14 22 28 0"/><path d="M36 124v50M164 124v50M36 174h128"/><rect x="62" y="132" width="76" height="22"/><path d="M80 72V50h40v22"/></svg>`,
};
