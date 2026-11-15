import { useRef } from 'react';
import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';
import { useScrollRaf } from '../../hooks/useScrollRaf.js';
import { clamp, isPH } from '../../lib/env.js';

export default function Timeline() {
  const tl = useRef(null);
  useScrollRaf(() => {
    const el = tl.current; if (!el) return;
    const r = el.getBoundingClientRect(), p = clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1);
    el.style.setProperty('--p', p.toFixed(3));
    el.querySelectorAll('.tl-item').forEach((it) => it.classList.toggle('on', it.offsetTop < p * r.height + 30));
  });
  return (
    <section className="tl-sec" id="schedule" aria-labelledby="s-h">
      <div className="wrap sec">
        <p className="tag rv">THE TIMELINE</p>
        <SplitHeading id="s-h" style={{ marginTop: 14 }} parts={[['How the day unfolds']]} />
        <p className="note rv">{CONFIG.timelineNote}</p>
        <ol className="tl" ref={tl} style={{ listStyle: 'none', marginBottom: 0 }}>
          {CONFIG.timeline.map((t) => (
            <li className="tl-item" key={t.title}>
              <span className="tl-time">{isPH(t.time) ? <span className="ph">{t.time}</span> : t.time || 'Time to be announced'}</span>
              <h3>{t.title}</h3><p>{t.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
