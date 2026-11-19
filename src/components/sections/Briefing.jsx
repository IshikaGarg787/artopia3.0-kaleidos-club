import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';
import Val from '../Val.jsx';

export default function Briefing() {
  const D = CONFIG.details;
  const panels = [
    ['Registration deadline', D.deadline], ['Eligibility', D.eligibility], ['Art competition fee', D.fee],
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
        </dl>
        <div className="brief-rules">
          <h3 className="tag">EVENT RULES & DETAILS</h3>
          <dl className="hud">
            {CONFIG.eventRules.map((rule, i) => (
              <div className="panel rv" key={rule.title} style={{ '--d': (i % 3) * 80 + 'ms' }}>
                <span className="scan" /><dt>{rule.title}</dt>
                <dd className={rule.items ? 'prize-list' : undefined}>
                  {rule.items ? rule.items.map((item) => <div className="prize-row" key={item.label}><span>{item.label}</span><span>{item.value}</span></div>) : rule.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
