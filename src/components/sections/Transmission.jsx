import { useRef } from 'react';
import SplitHeading from '../SplitHeading.jsx';
import { useScrollRaf } from '../../hooks/useScrollRaf.js';
import { RM } from '../../lib/env.js';

const WORDS = ['One campus', 'Infinite universes', 'Unlimited imagination', 'Create', 'Compete', 'Explore'];

export default function Transmission() {
  const shards = useRef([]);
  useScrollRaf(() => {
    if (RM) return;
    const vh = innerHeight;
    shards.current.forEach((s) => {
      if (!s) return;
      const r = s.getBoundingClientRect();
      if (r.bottom > -200 && r.top < vh + 200) s.style.setProperty('--py', ((r.top - vh / 2) * parseFloat(s.dataset.speed) * -1).toFixed(1) + 'px');
    });
  });
  const row = WORDS.map((w) => <span key={w}>{w}</span>);
  return (
    <section className="trans" id="event" aria-labelledby="t-h">
      <div className="shard" ref={(el) => (shards.current[0] = el)} style={{ left: '6%', top: '12%' }} data-speed=".08" aria-hidden="true"><i style={{ '--s': '70px', '--c': '#E62429', '--r': '20deg' }} /></div>
      <div className="shard" ref={(el) => (shards.current[1] = el)} style={{ right: '8%', top: '22%' }} data-speed="-.1" aria-hidden="true"><i style={{ '--s': '110px', '--c': '#38BDF8', '--r': '-30deg' }} /></div>
      <div className="shard" ref={(el) => (shards.current[2] = el)} style={{ right: '30%', bottom: '18%' }} data-speed=".14" aria-hidden="true"><i style={{ '--s': '50px', '--c': '#F5B942', '--r': '60deg' }} /></div>
      <div className="grid3d" aria-hidden="true" />
      <div className="wrap sec">
        <div className="trans-grid">
          <div>
            <p className="tag rv">INCOMING TRANSMISSION</p>
            <SplitHeading id="t-h" style={{ marginTop: 18 }} parts={[['Reality is just a '], ['canvas.', 'acc']]} />
          </div>
          <div className="trans-copy">
            <p className="big rv" style={{ '--d': '150ms' }}>Artopia 3.0 is a university art event bringing together creative minds from different colleges, under one sky and one very large idea.</p>
            <p className="lead rv" style={{ '--d': '250ms' }}>Across different universes, every artist has a different perspective. Artopia brings those perspectives together in one unforgettable celebration of creativity.</p>
            <div className="rv" style={{ '--d': '350ms' }}><a className="btn btn-ghost btn-sm" href="#experiences">See what's inside ↓</a></div>
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true"><div>{row}{row}{row}{row}</div></div>
    </section>
  );
}
