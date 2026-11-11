import { CONFIG } from '../config/eventConfig.js';
import { isPH } from '../lib/env.js';

const NAMES = { instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', facebook: 'Facebook' };

export default function Footer() {
  const social = Object.keys(CONFIG.social).filter((k) => CONFIG.social[k]);
  const contacts = CONFIG.coordinators.flatMap((c, i) => {
    const n = isPH(c.name) ? c.role : c.name, out = [];
    if (c.phone) out.push(<li key={`p${i}`}><a href={`tel:${c.phone.replace(/\s/g, '')}`}>{n}: {c.phone}</a></li>);
    if (c.email) out.push(<li key={`e${i}`}><a href={`mailto:${c.email}`}>{c.email}</a></li>);
    return out;
  });
  const soon = (t) => <li style={{ color: 'var(--mut)' }}>{t}</li>;
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img src="/images/kaleidos-logo.png" alt="Kaleidos Fine Arts Club logo" loading="lazy" />
              <p className="big">Artopia <span style={{ color: 'var(--gold)' }}>3.0</span></p>
            </div>
            <p style={{ color: 'var(--mut)', marginTop: 10 }}>The Marvel Multiverse Edition<br />KALEIDOS — Fine Arts Club<br />GLA University, Mathura</p>
          </div>
          <div><h4>EXPLORE</h4><ul>
            <li><a href="#event">The Event</a></li><li><a href="#experiences">Experiences</a></li><li><a href="#gallery">Gallery</a></li>
            <li><a href="#schedule">Schedule</a></li><li><a href="#venue">Venue</a></li><li><a href="#faq">FAQ</a></li></ul></div>
          <div><h4>FOLLOW</h4><ul>
            {social.length ? social.map((k) => <li key={k}><a href={CONFIG.social[k]} target="_blank" rel="noopener noreferrer">{NAMES[k] || k}</a></li>) : soon('Social links coming soon')}</ul></div>
          <div><h4>CONTACT</h4><ul>{contacts.length ? contacts : soon('Contact details coming soon')}</ul></div>
        </div>
        <small>© {new Date().getFullYear()} KALEIDOS — Fine Arts Club, GLA University. Artopia 3.0 is an independently organized university event with a Marvel-inspired creative theme. It is not an official Marvel or Disney production and is not affiliated with, endorsed or sponsored by Marvel Entertainment or The Walt Disney Company. All artwork on this page is original.</small>
      </div>
    </footer>
  );
}
