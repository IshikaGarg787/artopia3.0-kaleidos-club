import { useCallback, useEffect, useRef, useState } from 'react';
import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';
import { artSVG } from '../../lib/placeholderArt.js';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const roman = (n) => ROMAN[n] || String(n + 1);

export default function Gallery() {
  const items = CONFIG.gallery.items;
  const [broken, setBroken] = useState({}); // index -> true when the real photo file is missing
  const [open, setOpen] = useState(-1);
  const lastFocus = useRef(null);
  const xBtn = useRef(null), pBtn = useRef(null), nBtn = useRef(null);
  const touchX = useRef(0);

  const isPH = (i) => !items[i].src || broken[i];
  const srcOf = (i) => (isPH(i) ? artSVG(i) : items[i].src);
  const anyPH = items.some((_, i) => isPH(i));

  const show = useCallback((i) => setOpen((i + items.length) % items.length), [items.length]);
  const close = useCallback(() => { setOpen(-1); lastFocus.current && lastFocus.current.focus(); }, []);

  useEffect(() => {
    if (open < 0) return;
    document.body.classList.add('lock');
    xBtn.current && xBtn.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(open + 1);
      else if (e.key === 'ArrowLeft') show(open - 1);
      else if (e.key === 'Tab') {
        const f = [xBtn.current, pBtn.current, nBtn.current], i = f.indexOf(document.activeElement);
        e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    addEventListener('keydown', onKey);
    return () => { removeEventListener('keydown', onKey); document.body.classList.remove('lock'); };
  }, [open, close, show]);

  return (
    <section className="gal" id="gallery" aria-labelledby="g-h">
      <div className="wrap sec">
        <p className="tag rv">THE LEGACY GALLERY</p>
        <SplitHeading id="g-h" style={{ marginTop: 14 }} parts={[['Before this universe, there was another.']]} />
        <p className="lead rv" style={{ marginTop: 22, fontSize: 'clamp(1.1rem,2vw,1.5rem)', color: 'var(--white)' }}>Memories from Artopia 2.0.</p>
        {CONFIG.gallery.showPlaceholderNotice && anyPH && (
          <p className="gal-notice"><span aria-hidden="true">⚠</span><span>Placeholder artwork is shown below. Organizers: add real Artopia 2.0 photos to <code>public/images/artopia-2/</code> and they will appear here automatically.</span></p>
        )}
        <div className="gal-grid">
          {items.map((g, i) => (
            <button key={g.src + i} type="button" className={`tile rv ${g.span}`} style={{ '--d': (i % 4) * 90 + 'ms' }}
              aria-label={`Open photo: ${g.title}`} onClick={(e) => { lastFocus.current = e.currentTarget; show(i); }}>
              {isPH(i) && <span className="badge-ph">Placeholder</span>}
              <img src={srcOf(i)} alt={g.alt} loading="lazy" decoding="async" width="800" height="600" onError={() => setBroken((b) => (b[i] ? b : { ...b, [i]: true }))} />
              <span className="plq"><small>EXHIBIT {roman(i)}</small><span>{g.title}</span></span>
            </button>
          ))}
        </div>
      </div>

      {open >= 0 && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Artopia 2.0 photo viewer"
          onClick={(e) => { if (e.target === e.currentTarget || e.target.tagName === 'FIGURE') close(); }}
          onTouchStart={(e) => { touchX.current = e.changedTouches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) show(open + (dx < 0 ? 1 : -1)); }}>
          <button ref={xBtn} className="lb-x" type="button" aria-label="Close viewer" onClick={close}>✕</button>
          <button ref={pBtn} className="lb-p" type="button" aria-label="Previous photo" onClick={() => show(open - 1)}>‹</button>
          <button ref={nBtn} className="lb-n" type="button" aria-label="Next photo" onClick={() => show(open + 1)}>›</button>
          <figure>
            <img src={srcOf(open)} alt={items[open].alt} />
            <figcaption><b>EXHIBIT {roman(open)} · {items[open].title}</b>{isPH(open) ? 'Placeholder image. Real Artopia 2.0 photo coming soon.' : ''}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
