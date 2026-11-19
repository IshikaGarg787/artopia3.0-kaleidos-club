import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';
import { silhouette } from '../../lib/placeholderArt.js';
import { isPH } from '../../lib/env.js';

export default function Coordinators() {
  return (
    <section className="team" id="team" aria-labelledby="c-h">
      <div className="wrap sec">
        <p className="tag rv">THE TEAM BEHIND THE PORTAL</p>
        <SplitHeading id="c-h" style={{ marginTop: 14 }} parts={[['Meet the coordinators']]} />
        <div className="team-grid">
          {CONFIG.coordinators.map((c, i) => {
            return (
              <article className="co rv" key={i} data-tilt style={{ '--d': i * 100 + 'ms' }}>
                <div className="co-ph"><img src={c.photo || silhouette(i)} alt={c.photo ? c.name : 'Portrait placeholder'} loading="lazy" width="400" height="400" /></div>
                <div className="co-b">
                  <h3>{isPH(c.name) ? <span className="ph">{c.name}</span> : c.name}</h3>
                  <p className="role">{c.role}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
