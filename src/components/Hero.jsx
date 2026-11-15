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
        .from('.info-strip>div', { y: 18, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=.5');
    }, hero);
    return () => ctx.revert();
  }, [ready]);

  // scroll parallax on the content
  useScrollRaf(() => {
    if (RM || !inner.current || !hero.current) return;
    if (scrollY < hero.current.offsetHeight) inner.current.style.setProperty('--sy', scrollY * 0.12 + 'px');
  });

  // cursor-responsive parallax on the hero atmosphere (desktop)
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
        <div className="r" style={{ '--c': '#66764b', '--t': '22s', width: 'min(88vw,720px)', height: 'min(88vw,720px)' }} />
        <div className="r" style={{ '--c': '#a7ae7e', '--t': '30s', width: 'min(66vw,540px)', height: 'min(66vw,540px)' }} />
        <div className="r" style={{ '--c': '#c7a95e', '--t': '18s', width: 'min(46vw,380px)', height: 'min(46vw,380px)' }} />
        <div className="r" style={{ '--c': '#344633', '--t': '26s', width: 'min(106vw,880px)', height: 'min(106vw,880px)' }} />
      </div>
      <div className="halftone" />
      <div className="vignette" />

      <div className="wrap hero-inner" ref={inner}>
        <div className="hero-lockup">
          <p className="status-pill">
            <span className={'dot ' + dotCls} />
            <span>{statusText}{R.announcement ? ' — ' + R.announcement : ''}</span>
          </p>
          <p className="hero-overline">KALEIDOS PRESENTS · DOOMSDAY EDITION</p>
          <h1 className="hero-title" aria-label="Artopia 3.0 — The Marvel Multiverse Edition">
            <span className="ht-a" aria-hidden="true">{letters('ARTOPIA')}</span>
            <span className="ht-b" aria-hidden="true">{letters('3.0')}</span>
          </h1>
          <p className="hero-sub">The Marvel Multiverse Edition</p>
        </div>
        <div className="hero-story">
          <p className="hero-head">Your universe.<br />Your masterpiece.</p>
          <p className="hero-copy">Step into a universe where imagination has no limits. Compete, create, explore, and let your art become legendary.</p>
          <div className="cta-row">
            <RegisterButton className="btn mag" />
            <a className="btn btn-ghost mag" href="#event">Explore the universe <span aria-hidden="true">↓</span></a>
          </div>
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
