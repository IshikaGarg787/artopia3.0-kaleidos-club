import { CONFIG } from '../../config/eventConfig.js';

export default function Venue() {
  const D = CONFIG.details;

  return (
    <section className="venue" id="venue" aria-labelledby="v-h">
      <div className="wrap sec">
        <div className="v-card rv" style={{ maxWidth: 760 }}>
          <p className="big">{D.venueExact},<br />{D.venue}</p>
        </div>
      </div>
    </section>
  );
}
