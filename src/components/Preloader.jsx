import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** Short, skippable intro. Plays once per browser session. */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    document.body.classList.add('lock');
    let finished = false;
    let tl;
    const finish = () => {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem('artopia3-intro', '1'); } catch { /* ignore */ }
      onReveal();
      onDone();
    };
    const ctx = gsap.context(() => {
      const circles = el.querySelectorAll('circle');
      circles.forEach((c) => { const L = c.getTotalLength(); c.style.strokeDasharray = L; c.style.strokeDashoffset = L; });
      tl = gsap.timeline({ onComplete: finish });
      tl.to(circles, { strokeDashoffset: 0, duration: 1, stagger: 0.18, ease: 'power2.inOut' })
        .from('.pl-msg', { opacity: 0, y: 10, duration: 0.5 }, 0.2)
        .to('.pl-msg', { opacity: 0, duration: 0.35 }, 1.15)
        .from('.pl-title .ch', { opacity: 0, scale: 2.2, yPercent: 60, stagger: 0.045, duration: 0.5, ease: 'back.out(2)' }, 1.3)
        .to('.pl-ring', { rotation: 180, scale: 1.15, duration: 1.2, ease: 'power2.inOut' }, 0.2)
        .add(() => onReveal(), '+=.1')
        .to(el, { clipPath: 'circle(0% at 50% 50%)', duration: 0.9, ease: 'power3.inOut' }, '<');
    }, el);

    el.skip = () => { if (finished) return; tl && tl.kill(); gsap.to(el, { opacity: 0, duration: 0.35, onComplete: finish }); };
    const onKey = (e) => { if (e.key === 'Escape') el.skip(); };
    addEventListener('keydown', onKey);
    const failsafe = setTimeout(() => { tl && tl.kill(); finish(); }, 6000);
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
    <div id="preloader" ref={root} role="status" aria-label="Loading Artopia 3.0">
      <div className="pl-stars" />
      <div className="pl-box">
        <svg className="pl-ring" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="92" stroke="#E62429" />
          <circle cx="100" cy="100" r="78" stroke="#38BDF8" opacity=".8" />
          <circle cx="100" cy="100" r="64" stroke="#F5B942" opacity=".7" />
        </svg>
        <p className="pl-msg">A NEW UNIVERSE IS FORMING</p>
        <p className="pl-title disp" aria-hidden="true">
          {[...'ARTOPIA 3.0'].map((c, i) => <span className="ch" key={i}>{c === ' ' ? '\u00A0' : c}</span>)}
        </p>
      </div>
      <button className="pl-skip" type="button" onClick={() => root.current.skip()}>Skip intro</button>
    </div>
  );
}
