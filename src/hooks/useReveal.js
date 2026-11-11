import { useEffect } from 'react';
import { RM } from '../lib/env.js';

/** Adds the "in" class to .rv / .rv-clip / [data-split] elements when they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv,.rv-clip,[data-split]')];
    if (RM || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}
