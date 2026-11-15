import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** Lightweight full-screen title reveal with simple forming rings. */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    document.body.classList.add('lock');
    let finished = false;
    let revealed = false;
    let tl;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      onReveal();
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      reveal();
      try { sessionStorage.setItem('artopia3-intro-v8', '1'); } catch { /* ignore */ }
      onDone();
    };

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ onComplete: finish });
      tl.fromTo('.intro-ring', { opacity: 0, scale: 0.35, rotate: -18 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' }, 0)
        .fromTo('.intro-core', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' }, 0.48)
        .fromTo('.intro-title', { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.72, ease: 'power3.out' }, 0.92)
        .fromTo('.intro-rule', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.86, duration: 0.48, ease: 'power2.out' }, 1.24)
        .add(reveal, 1.72)
        .to('.intro-title,.intro-rule', { opacity: 0.78, duration: 0.18 }, 2.28)
        .to(el, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, 2.28);
    }, el);

    el.skip = () => { if (finished) return; tl && tl.kill(); gsap.to(el, { opacity: 0, duration: 0.2, onComplete: finish }); };
    const onKey = (e) => { if (e.key === 'Escape') el.skip(); };
    addEventListener('keydown', onKey);
    const failsafe = setTimeout(() => { tl && tl.kill(); finish(); }, 5000);
    el.querySelector('.pl-skip').focus({ preventScroll: true });

    return () => {
      clearTimeout(failsafe);
      removeEventListener('keydown', onKey);
      document.body.classList.remove('lock');
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="preloader" ref={root} role="status" aria-label="Artopia 3.0 intro">
      <div className="intro-universe" aria-hidden="true">
        <i className="intro-ring intro-ring-outer" />
        <i className="intro-ring intro-ring-middle" />
        <i className="intro-ring intro-ring-inner" />
        <i className="intro-core" />
      </div>
      <div className="intro-copy">
        <h1 className="intro-title disp">ARTOPIA <span>3.0</span></h1>
        <div className="intro-rule" />
      </div>
      <button className="pl-skip" type="button" onClick={() => root.current.skip()}>Skip intro</button>
    </div>
  );
}
