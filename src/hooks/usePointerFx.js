import { useEffect } from 'react';
import { FINE, RM } from '../lib/env.js';

/** Desktop-only card tilt + magnetic buttons, using one delegated listener (no per-element code). */
export function usePointerFx() {
  useEffect(() => {
    if (!FINE || RM) return;
    let tilted = null;
    const move = (e) => {
      const t = e.target.closest && e.target.closest('[data-tilt]');
      if (tilted && tilted !== t) { tilted.style.setProperty('--rx', '0deg'); tilted.style.setProperty('--ry', '0deg'); }
      tilted = t || null;
      if (t) {
        const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        t.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
        t.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
      }
      document.querySelectorAll('.mag').forEach((b) => {
        const r = b.getBoundingClientRect();
        if (e.clientX > r.left - 20 && e.clientX < r.right + 20 && e.clientY > r.top - 20 && e.clientY < r.bottom + 20)
          b.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 14}px,${((e.clientY - r.top) / r.height - 0.5) * 10}px)`;
        else if (b.style.transform) b.style.transform = '';
      });
    };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, []);
}
