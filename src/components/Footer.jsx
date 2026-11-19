import { CONFIG } from '../config/eventConfig.js';

const NAMES = { instagram: 'Instagram', youtube: 'YouTube', linkedin: 'LinkedIn', facebook: 'Facebook' };
const CONTACTS = [
  ['Abhinna Singh', '+91 7897740582'], ['Arpit Gupta', '+91 8865930678'], ['Simran Sachdeva', '+91 8795961912'],
];

export default function Footer() {
  const social = Object.keys(CONFIG.social).filter((k) => CONFIG.social[k]);
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
            {social.length ? social.map((k) => <li key={k}><a href={CONFIG.social[k]} target="_blank" rel="noopener noreferrer">{NAMES[k] || k}</a></li>) : soon('Social links coming soon')}
          </ul></div>
          <div><h4>CONTACT</h4><ul>
            {CONTACTS.map(([name, phone]) => <li key={name}><a href={`tel:${phone.replace(/\s/g, '')}`}>{name}: {phone}</a>{name === 'Simran Sachdeva' && <span style={{display:'block', color:'var(--mut)', fontSize:'.82rem'}}>Yamuna Hostel · Room 3003</span>}</li>)}
          </ul></div>
        </div>
        <small>© {new Date().getFullYear()} KALEIDOS — Fine Arts Club, GLA University. Artopia 3.0 is an independently organized university event with a Marvel-inspired creative theme. It is not an official Marvel or Disney production and is not affiliated with, endorsed or sponsored by Marvel Entertainment or The Walt Disney Company. All artwork on this page is original.</small>
      </div>
    </footer>
  );
}
