import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PortalScene from './PortalScene.jsx';
import RegisterButton from './RegisterButton.jsx';
import Val from './Val.jsx';
import { CONFIG } from '../config/eventConfig.js';
import { FINE, RM } from '../lib/env.js';
import { useScrollRaf } from '../hooks/useScrollRaf.js';

const STATUS = { open: ['open', 'Registrations open'], soon: ['', 'Registrations opening soon'], closed: ['closed', 'Registrations closed'] };

export default function Hero({ ready }) {
  const hero = useRef(null);
  const inner = useRef(null);
  const [noGL, setNoGL] = useState(false);
  const D = CONFIG.details, R = CONFIG.registration;
  const [dotCls, statusText] = STATUS[R.status] || STATUS.soon;

  // headline entrance, after the preloader reveals the page
  useEffect(() => {
    if (!ready || RM) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.ht-a .ch', { yPercent: 120, rotateX: -80, opacity: 0, stagger: 0.05, duration: 1.1 })
        .from('.ht-b .ch', { scale: 2.4, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'back.out(2)' }, '-=.7')
        .from('.hero-sub', { opacity: 0, letterSpacing: '.5em', duration: 1 }, '-=.5')
        .from('.status-pill,.hero-head,.hero-copy,.hero .cta-row', { y: 28, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=.7')
        .from('.info-strip>div', { y: 18, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=.5')
        .from('.hf-card', { scale: 0.5, opacity: 0, stagger: 0.12, duration: 1, ease: 'back.out(1.6)' }, '-=1.2');
    }, hero);
    return () => ctx.revert();
  }, [ready]);

  // scroll parallax on the content
  useScrollRaf(() => {
    if (RM || !inner.current || !hero.current) return;
    if (scrollY < hero.current.offsetHeight) inner.current.style.setProperty('--sy', scrollY * 0.12 + 'px');
  });

  // cursor-responsive parallax on the floating panels (desktop)
  useEffect(() => {
    if (!FINE || RM) return;
    let queued = false, cx = 0, cy = 0;
    const move = (e) => {
      cx = e.clientX; cy = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          const h = hero.current; if (!h) return;
          if (h.getBoundingClientRect().bottom > 0) { h.style.setProperty('--mx', (cx / innerWidth - 0.5).toFixed(3)); h.style.setProperty('--my', (cy / innerHeight - 0.5).toFixed(3)); }
        });
      }
    };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, []);

  const letters = (t) => [...t].map((c, i) => <span className="ch" key={i}>{c}</span>);

  return (
    <section className={'hero' + (noGL ? ' no-webgl' : '')} id="home" ref={hero} aria-label="Artopia 3.0 hero">
      <PortalScene heroRef={hero} onFallback={() => setNoGL(true)} />
      <div className="portal-css" aria-hidden="true">
        <div className="core" />
        <div className="r" style={{ '--c': '#E62429', '--t': '22s', width: 'min(88vw,720px)', height: 'min(88vw,720px)' }} />
        <div className="r" style={{ '--c': '#38BDF8', '--t': '30s', width: 'min(66vw,540px)', height: 'min(66vw,540px)' }} />
        <div className="r" style={{ '--c': '#F5B942', '--t': '18s', width: 'min(46vw,380px)', height: 'min(46vw,380px)' }} />
        <div className="r" style={{ '--c': '#8B5CF6', '--t': '26s', width: 'min(106vw,880px)', height: 'min(106vw,880px)' }} />
      </div>
      <div className="halftone" />
      <div className="vignette" />

      <div className="hfrag f1" aria-hidden="true"><div className="hf-float"><div className="hf-card"><svg viewBox="0 0 100 100"><path d="M10 80 Q40 10 90 20 Q70 50 60 90Z" fill="#F5B942" opacity=".9" /></svg><b>CREATE!</b></div></div></div>
      <div className="hfrag f2" aria-hidden="true"><div className="hf-float"><div className="hf-card"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="#fff" strokeWidth="5" /><circle cx="50" cy="50" r="18" fill="#F5F2ED" /></svg><b>IMAGINE!</b></div></div></div>
      <div className="hfrag f3" aria-hidden="true"><div className="hf-float"><div className="hf-card"><svg viewBox="0 0 100 100"><polygon points="50,6 62,38 96,40 68,60 78,94 50,74 22,94 32,60 4,40 38,38" fill="#E62429" /></svg><b>COMPETE!</b></div></div></div>
      <div className="hfrag f4" aria-hidden="true"><div className="hf-float"><div className="hf-card"><svg viewBox="0 0 100 100"><rect x="18" y="18" width="64" height="64" fill="none" stroke="#38BDF8" strokeWidth="6" transform="rotate(18 50 50)" /><rect x="34" y="34" width="32" height="32" fill="#F5B942" transform="rotate(18 50 50)" /></svg><b>EXPLORE!</b></div></div></div>

      <div className="wrap hero-inner" ref={inner}>
        <p className="status-pill">
          <span className={'dot ' + dotCls} />
          <span>{statusText}{R.announcement ? ' — ' + R.announcement : ''}</span>
        </p>
        <h1 className="hero-title" aria-label="Artopia 3.0 — The Marvel Multiverse Edition">
          <span className="ht-a" aria-hidden="true">{letters('ARTOPIA')}</span>
          <span className="ht-b" aria-hidden="true">{letters('3.0')}</span>
        </h1>
        <p className="hero-sub comic">The Marvel Multiverse Edition</p>
        <p className="hero-head">Your universe.<br />Your masterpiece.</p>
        <p className="hero-copy">Step into a universe where imagination has no limits. Compete, create, explore, and let your art become legendary.</p>
        <div className="cta-row">
          <RegisterButton className="btn mag" />
          <a className="btn btn-ghost mag" href="#event">Explore the universe ↓</a>
        </div>
      </div>

      <dl className="info-strip">
        <div><dt>Date</dt><dd><Val v={D.date} /></dd></div>
        <div><dt>Venue</dt><dd>{[D.venueExact, D.venue].filter(Boolean).join(', ')}</dd></div>
        <div><dt>Organized by</dt><dd>KALEIDOS — Fine Arts Club</dd></div>
      </dl>
      <div className="scroll-ind" aria-hidden="true">SCROLL</div>
    </section>
  );
}
