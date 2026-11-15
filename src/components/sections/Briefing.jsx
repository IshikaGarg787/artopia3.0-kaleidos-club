import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';
import Val from '../Val.jsx';

export default function Briefing() {
  const D = CONFIG.details;
  const panels = [
    ['Date', D.date], ['Time', D.time], ['Venue', [D.venueExact, D.venue].filter(Boolean).join(', ')],
    ['Registration deadline', D.deadline], ['Eligibility', D.eligibility], ['Participation format', D.format], ['Entry fee', D.fee],
  ];
  return (
    <section className="brief" id="briefing" aria-labelledby="b-h">
      <div className="wrap sec">
        <p className="tag rv">CLASSIFIED FOR ARTISTS</p>
        <SplitHeading id="b-h" style={{ marginTop: 14 }} parts={[['Your mission briefing']]} />
        <dl className="hud">
          {panels.map(([k, v], i) => (
            <div className="panel rv" key={k} style={{ '--d': (i % 3) * 80 + 'ms' }}><span className="scan" /><dt>{k}</dt><dd><Val v={v} /></dd></div>
          ))}
          <div className="panel wide rv"><span className="scan" /><dt>Competition details</dt><dd><Val v={D.competition} /></dd></div>
        </dl>
      </div>
    </section>
  );
}
