import { useEffect, useRef } from 'react';

/** Calls `cb` on scroll/resize, at most once per animation frame. */
export function useScrollRaf(cb) {
  const ref = useRef(cb);
  useEffect(() => { ref.current = cb; });
  useEffect(() => {
    let queued = false;
    const run = () => { queued = false; ref.current(); };
    const on = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    run();
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); };
  }, []);
}
