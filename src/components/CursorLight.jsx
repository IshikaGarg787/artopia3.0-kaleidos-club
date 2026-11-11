import { useEffect, useRef } from 'react';
import { FINE, RM } from '../lib/env.js';

export default function CursorLight() {
  const ref = useRef(null);
  useEffect(() => {
    if (!FINE || RM) return;
    const el = ref.current;
    let x = 0, y = 0, queued = false;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; el.style.opacity = 1; el.style.transform = `translate3d(${x}px,${y}px,0)`; }); }
    };
    const leave = () => { el.style.opacity = 0; };
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, []);
  return <div id="cursor-light" ref={ref} aria-hidden="true" />;
}
