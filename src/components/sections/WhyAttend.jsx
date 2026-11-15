import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';

export default function WhyAttend() {
  return (
    <section className="why" id="arena" aria-labelledby="w-h">
      <div className="wrap sec">
        <div className="why-grid">
          <div className="why-left">
            <p className="tag rv">THE ARTISTS' ARENA</p>
            <SplitHeading id="w-h" style={{ marginTop: 14 }} parts={[['Why step through?']]} />
            <p className="lead rv" style={{ marginTop: 22 }}>One campus, one stage, and a crowd that came to see what you can make.</p>
            <svg className="burst rv" viewBox="0 0 200 200" aria-hidden="true">
              <polygon points="100,4 118,46 160,22 150,68 196,70 160,100 196,130 150,132 160,178 118,154 100,196 82,154 40,178 50,132 4,130 40,100 4,70 50,68 40,22 82,46" fill="#F5B942" stroke="#07070B" strokeWidth="5" />
              <text x="100" y="112" textAnchor="middle" fontFamily="Bangers,Comic Sans MS,cursive" fontSize="40" fill="#E62429" stroke="#07070B" strokeWidth="2">CREATE!</text>
            </svg>
          </div>
          <ul className="why-list">
            {CONFIG.whyAttend.map((w, i) => (
              <li className="why-item rv" key={w.t} style={{ '--c': w.c, '--d': (i % 3) * 80 + 'ms' }}>
                <h3>{w.t}</h3><p>{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
