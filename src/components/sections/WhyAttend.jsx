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
              <circle cx="100" cy="100" r="91" fill="none" stroke="#66764b" strokeWidth="2" />
              <circle cx="100" cy="100" r="78" fill="none" stroke="#c7a95e" strokeOpacity=".72" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="53" fill="#0b130d" stroke="#66764b" strokeWidth="1.5" />
              <path d="M100 12V188M12 100H188M38 38l124 124M162 38 38 162" stroke="#344633" strokeWidth="1" />
              <path d="M100 34 116 83 166 100 116 117 100 166 84 117 34 100 84 83Z" fill="none" stroke="#c7a95e" strokeWidth="2" />
              <text x="100" y="108" textAnchor="middle" fontFamily="Cormorant Garamond,Georgia,serif" fontSize="24" fontWeight="600" letterSpacing="2" fill="#e9e6d8">CREATE</text>
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
