import { useRef, useState } from 'react';
import { useScrollRaf } from '../hooks/useScrollRaf.js';
import RegisterButton from './RegisterButton.jsx';
import { RM } from '../lib/env.js';

/** Top progress bar, sticky mobile Register bar, and back-to-top button. */
export default function ScrollWidgets() {
  const bar = useRef(null);
  const [showBar, setShowBar] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useScrollRaf(() => {
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    const hero = document.getElementById('home'), fin = document.getElementById('join');
    const hh = hero ? hero.offsetHeight : vh;
    const nearFinal = fin ? fin.getBoundingClientRect().top < vh * 0.4 : false;
    setShowBar(y > hh * 0.7 && !nearFinal);
    setShowTop(y > vh);
  });

  return (
    <>
      <div id="scroll-prog" ref={bar} aria-hidden="true" />
      <div className={'mbar' + (showBar ? ' show' : '')}><RegisterButton /></div>
      <a className={'totop' + (showTop ? ' show' : '')} href="#home" aria-label="Back to top"
        onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); }}>↑</a>
    </>
  );
}
