import { CONFIG } from '../../config/eventConfig.js';
import RegisterButton from '../RegisterButton.jsx';
import SplitHeading from '../SplitHeading.jsx';

const STATUS = { open: 'Registrations open', soon: 'Registrations opening soon', closed: 'Registrations closed' };

export default function FinalCta() {
  const R = CONFIG.registration;
  return (
    <section className="final" id="join" aria-labelledby="fin-h">
      <div className="fp" aria-hidden="true">
        <i style={{ '--k': 0, '--c': '#8B5CF6', '--t': '60s' }} /><i style={{ '--k': 9, '--c': '#E62429', '--t': '34s' }} />
        <i style={{ '--k': 19, '--c': '#38BDF8', '--t': '26s' }} /><i style={{ '--k': 30, '--c': '#F5B942', '--t': '20s' }} /><u />
      </div>
      <div className="wrap">
        <p className="tag rv">LAST CALL</p>
        <SplitHeading id="fin-h" style={{ marginTop: 14 }} parts={[['The multiverse is waiting.']]} />
        <p className="s rv">Your creativity deserves a universe of its own. Be part of Artopia 3.0.</p>
        <RegisterButton className="btn btn-xl mag">Register for Artopia 3.0 ↗</RegisterButton>
        <p className="org rv">{STATUS[R.status] || STATUS.soon}{R.announcement ? ' — ' + R.announcement : ''}</p>
        <p className="org">Organized by KALEIDOS — Fine Arts Club, GLA University.</p>
      </div>
    </section>
  );
}
