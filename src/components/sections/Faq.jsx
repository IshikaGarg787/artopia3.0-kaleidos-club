import { useMemo, useState } from 'react';
import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';
import { isPH } from '../../lib/env.js';

export default function Faq() {
  const [open, setOpen] = useState(-1);
  const D = CONFIG.details;

  // Auto-fill answers from the event details once they are confirmed (not placeholders)
  const faq = useMemo(() => {
    const ok = (v) => v && !isPH(v);
    const hasContact = CONFIG.coordinators.some((c) => c.phone || c.email || c.instagram);
    return CONFIG.faq.map((f) => {
      if (f.a) return f;
      let a = '';
      if (/where and when/i.test(f.q) && ok(D.date)) a = `${ok(D.venueExact) ? D.venueExact + ', ' : ''}${D.venue}. ${D.date}${ok(D.time) ? ', ' + D.time : ''}.`;
      else if (/contact/i.test(f.q) && hasContact) a = 'Reach out to the coordinators listed in the “Meet the coordinators” section.';
      else if (/fee/i.test(f.q) && ok(D.fee)) a = D.fee;
      else if (/who can participate/i.test(f.q) && ok(D.eligibility)) a = D.eligibility;
      return { ...f, a };
    });
  }, [D]);

  return (
    <section className="faq" id="faq" aria-labelledby="f-h">
      <div className="wrap sec">
        <p className="tag rv">QUESTIONS FROM OTHER DIMENSIONS</p>
        <SplitHeading id="f-h" style={{ marginTop: 14 }} parts={[['Answers from this universe']]} />
        <div className="faq-list">
          {faq.map((f, i) => (
            <div className={'q' + (open === i ? ' open' : '')} key={f.q}>
              <h3 style={{ display: 'block', margin: 0, font: 'inherit' }}>
                <button type="button" id={`fq${i}`} aria-expanded={open === i} aria-controls={`fa${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span><span className="pm" aria-hidden="true" />
                </button>
              </h3>
              <div className="a" id={`fa${i}`} role="region" aria-labelledby={`fq${i}`}><div><p>{f.a || CONFIG.faqFallback}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
