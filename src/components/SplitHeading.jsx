/** Headline that reveals word by word. parts = [['plain text'], ['accent word', 'acc']] */
export default function SplitHeading({ id, className = 'disp h2', style, parts }) {
  let i = 0;
  const label = parts.map((p) => p[0]).join('').replace(/\s+/g, ' ').trim();
  const nodes = [];
  parts.forEach(([text, extra], pi) => {
    text.split(/(\s+)/).forEach((t, ti) => {
      if (!t) return;
      if (!t.trim()) { nodes.push(t); return; }
      nodes.push(
        <span key={`${pi}-${ti}`} className={'w' + (extra ? ' ' + extra : '')} aria-hidden="true">
          <span className="wi" style={{ '--i': i++ }}>{t}</span>
        </span>
      );
    });
  });
  return <h2 id={id} className={className} data-split aria-label={label} style={style}>{nodes}</h2>;
}
