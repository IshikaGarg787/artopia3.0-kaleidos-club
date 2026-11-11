export const RM = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const FINE = typeof matchMedia !== 'undefined' && matchMedia('(hover:hover) and (pointer:fine)').matches;
export const MOBILE = typeof innerWidth !== 'undefined' && innerWidth < 760;
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const isPH = (v) => typeof v === 'string' && /^\s*\[.*\]\s*$/.test(v);
