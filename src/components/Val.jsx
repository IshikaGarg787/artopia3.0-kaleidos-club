import { isPH } from '../lib/env.js';
/** Shows a config value: placeholder in gold, empty as "To be announced". */
export default function Val({ v }) {
  if (!v) return <span className="tba">To be announced</span>;
  if (isPH(v)) return <span className="ph" title="Organizers: update this in src/config/eventConfig.js">{v}</span>;
  return <>{v}</>;
}
