import { useEffect, useRef } from 'react';
import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';
import { ART } from '../../lib/placeholderArt.js';
import { RM, clamp } from '../../lib/env.js';

export default function Experiences() {
  const track = useRef(null);
  const prog = useRef(null);
  const step = () => Math.min(420, track.current.clientWidth * 0.8);
  const go = (dir) => track.current.scrollBy({ left: dir * step(), behavior: RM ? 'auto' : 'smooth' });

  useEffect(() => {
    const tr = track.current;
    const upd = () => {
      const m = tr.scrollWidth - tr.clientWidth;
      prog.current.style.transform = `scaleX(${m > 0 ? clamp(0.12 + (0.88 * tr.scrollLeft) / m, 0.05, 1) : 1})`;
    };
    let q = false;
    const on = () => { if (!q) { q = true; requestAnimationFrame(() => { q = false; upd(); }); } };
    tr.addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    upd();
    return () => { tr.removeEventListener('scroll', on); removeEventListener('resize', on); };
  }, []);

  return (
    <section className="exp" id="experiences" aria-labelledby="e-h">
      <div className="wrap" style={{ paddingTop: 'clamp(90px,14vw,190px)' }}>
        <div className="exp-head">
          <div>
            <p className="tag rv">PICK A DIMENSION</p>
            <SplitHeading id="e-h" style={{ marginTop: 14 }} parts={[['Choose your universe']]} />
          </div>
          <div className="ctrls">
            <button className="ctrl" type="button" aria-label="Previous experience" onClick={() => go(-1)}>←</button>
            <button className="ctrl" type="button" aria-label="Next experience" onClick={() => go(1)}>→</button>
          </div>
        </div>
      </div>
      <div className="track" ref={track} tabIndex={0} role="region" aria-label="Event experiences, scroll horizontally"
        onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } }}>
        {CONFIG.experiences.map((x) => (
          <article className="xp" key={x.title} style={{ '--acc': x.accent }} data-tilt>
            <span className="kind">{x.kind}</span>
            <div className="xp-art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ART[x.art] || ART.frame }} />
            <div className="xp-body">
              <h3>{x.title}</h3>
              <p>{x.desc}</p>
              {x.link && <a href={x.link} target="_blank" rel="noopener noreferrer">More details ↗</a>}
            </div>
          </article>
        ))}
      </div>
      <div className="wrap">
        <div className="exp-prog"><i ref={prog} /></div>
      </div>
      <div style={{ height: 'clamp(70px,10vw,140px)' }} />
    </section>
  );
}
