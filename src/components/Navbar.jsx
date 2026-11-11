import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import RegisterButton from './RegisterButton.jsx';
import { useScrollRaf } from '../hooks/useScrollRaf.js';

const LINKS = [['#home', 'Home'], ['#event', 'The Event'], ['#experiences', 'Experiences'], ['#gallery', 'Gallery'], ['#schedule', 'Schedule'], ['#faq', 'FAQ']];
// which section id highlights which nav link
const SECTION_TO_LINK = { home: '#home', event: '#event', experiences: '#experiences', arena: '#experiences', gallery: '#gallery', briefing: '#schedule', schedule: '#schedule', venue: '#schedule', team: '#faq', faq: '#faq' };

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(null);
  const linkRefs = useRef({});
  const ind = useRef(null);
  const burger = useRef(null);

  useScrollRaf(() => setSolid(scrollY > 40));

  // which section is in view
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && SECTION_TO_LINK[e.target.id]) setActive(SECTION_TO_LINK[e.target.id]);
    }), { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(SECTION_TO_LINK).forEach((id) => { const s = document.getElementById(id); s && io.observe(s); });
    return () => io.disconnect();
  }, []);

  // slide the underline under the active link
  const place = () => {
    const a = linkRefs.current[active], el = ind.current;
    if (!el) return;
    if (!a) { el.style.opacity = 0; return; }
    el.style.opacity = 1;
    el.style.width = a.offsetWidth - 28 + 'px';
    el.style.transform = `translateX(${a.offsetLeft + 14}px)`;
  };
  useLayoutEffect(place, [active]);
  useEffect(() => {
    addEventListener('resize', place);
    document.fonts && document.fonts.ready.then(place);
    return () => removeEventListener('resize', place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // mobile menu: lock scroll, Escape closes, close when widening the window
  useEffect(() => {
    document.body.classList.toggle('lock', menu);
    const onKey = (e) => { if (e.key === 'Escape' && menu) { setMenu(false); burger.current?.focus(); } };
    const onResize = () => { if (innerWidth >= 980) setMenu(false); };
    addEventListener('keydown', onKey); addEventListener('resize', onResize);
    return () => { removeEventListener('keydown', onKey); removeEventListener('resize', onResize); if (menu) document.body.classList.remove('lock'); };
  }, [menu]);

  return (
    <>
      <header className={'nav' + (solid ? ' solid' : '')}>
        <div className="wrap nav-in">
          <a className="brand" href="#home" aria-label="Kaleidos × Artopia 3.0, back to top">
            <img className="mark" src="/images/kaleidos-logo.png" alt="" aria-hidden="true" />
            <span>Kaleidos <i>×</i> Artopia <b>3.0</b></span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([h, t]) => (
              <a key={h} href={h} ref={(el) => (linkRefs.current[h] = el)} className={active === h ? 'on' : ''}>{t}</a>
            ))}
            <span className="nav-ind" ref={ind} aria-hidden="true" />
          </nav>
          <RegisterButton className="btn btn-sm nav-reg mag" />
          <button ref={burger} className="burger" type="button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="menu" onClick={() => setMenu((m) => !m)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className={'menu' + (menu ? ' open' : '')} id="menu" aria-hidden={!menu} onClick={(e) => { if (e.target.closest('a,button')) setMenu(false); }}>
        {LINKS.map(([h, t]) => <a key={h} href={h} tabIndex={menu ? 0 : -1}>{t}</a>)}
        <RegisterButton tabIndex={menu ? 0 : -1} />
      </div>
    </>
  );
}
