import { useState } from 'react';
import { CONFIG } from '../../config/eventConfig.js';
import SplitHeading from '../SplitHeading.jsx';

export default function Faq() {
  const [open, setOpen] = useState(-1);
  const faq = CONFIG.faq;

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
