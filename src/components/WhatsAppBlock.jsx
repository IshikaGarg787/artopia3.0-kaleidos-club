import { CONFIG } from '../config/eventConfig.js';

/** WhatsApp group notice. Leaves clear space for the QR code until you add it in eventConfig.js */
export default function WhatsAppBlock() {
  const { qrImage, groupLink } = CONFIG.registration.whatsapp;
  return (
    <div className="wa">
      <p className="wa-note">
        <span aria-hidden="true">📌 </span>
        All participants of <b>Artopia 3.0</b> are required to join the following WhatsApp Group to receive important
        updates, instructions, and announcements regarding the event.
      </p>
      <div className="wa-qr">
        {qrImage ? (
          <img src={qrImage} alt="QR code to join the Artopia 3.0 WhatsApp group" width="260" height="260" />
        ) : (
          <div className="wa-ph" role="img" aria-label="Space reserved for the WhatsApp group QR code">
            <span>QR CODE<br />WILL BE ADDED HERE</span>
          </div>
        )}
        {qrImage && <p className="wa-scan">Or scan the code to join the group.</p>}
        {groupLink && (
          <a className="btn btn-sm" href={groupLink} target="_blank" rel="noopener noreferrer">Join WhatsApp group ↗</a>
        )}
      </div>
    </div>
  );
}
