import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateRegistration } from '../shared/formOptions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIELD_LABEL = { rollNumber: 'University Roll Number', email: 'email address' };

function makeRegistrationId() {
  // e.g. ART3-7K2M9Q  (no confusing characters like 0/O or 1/I)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (const b of crypto.randomBytes(6)) id += chars[b % chars.length];
  return 'ART3-' + id;
}

const csvCell = (v) => {
  let s = Array.isArray(v) ? v.join('; ') : v instanceof Date ? v.toISOString() : String(v ?? '');
  if (/^[=+\-@]/.test(s)) s = "'" + s; // stops spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
};

/** Builds the Express app. `Registration` is the Mongoose model. */
export function createApp({ Registration, env = process.env }) {
  const app = express();
  if (env.TRUST_PROXY) app.set('trust proxy', Number(env.TRUST_PROXY) || 1);
  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: env.CLIENT_ORIGIN ? env.CLIENT_ORIGIN.split(',') : true }));
  app.use(express.json({ limit: '10kb' }));

  const registrationOpen = () => String(env.REGISTRATION_OPEN ?? 'true').toLowerCase() !== 'false';

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: Number(env.RATE_LIMIT_MAX) || 30,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) =>
      res.status(429).json({ ok: false, status: 'rate_limited', message: 'Too many attempts. Please wait a few minutes and try again.' }),
  });

  app.get('/api/health', (req, res) => res.json({ ok: true, registrationOpen: registrationOpen() }));

  // ------------------------------------------------------------------ REGISTER
  app.post('/api/registrations', limiter, async (req, res) => {
    try {
      if (!registrationOpen())
        return res.status(403).json({ ok: false, status: 'closed', message: 'Registrations for Artopia 3.0 are closed.' });

      // Hidden "honeypot" field: real people never fill it, bots usually do.
      if (req.body && req.body.website)
        return res.status(400).json({ ok: false, status: 'validation_error', errors: {}, message: 'Could not process this request.' });

      const { values, errors } = validateRegistration(req.body);
      if (Object.keys(errors).length)
        return res.status(422).json({ ok: false, status: 'validation_error', message: `${Object.keys(errors).length} field${Object.keys(errors).length === 1 ? ' has' : 's have'} a problem. See the details below.`, errors });

      const dupMessage = (field) => ({
        ok: false,
        status: 'already_registered',
        field,
        message: `This ${FIELD_LABEL[field]} is already registered for Artopia 3.0. If you think this is a mistake, please contact the organizers.`,
      });

      const existing = await Registration.findOne({ $or: [{ rollNumber: values.rollNumber }, { email: values.email }] })
        .select('rollNumber email')
        .lean();
      if (existing) return res.status(409).json(dupMessage(existing.rollNumber === values.rollNumber ? 'rollNumber' : 'email'));

      let doc;
      for (let attempt = 0; attempt < 3 && !doc; attempt++) {
        try {
          doc = await Registration.create({ ...values, registrationId: makeRegistrationId() });
        } catch (err) {
          if (err && err.code === 11000) {
            const key = Object.keys(err.keyPattern || err.keyValue || {})[0];
            if (key === 'rollNumber' || key === 'email') return res.status(409).json(dupMessage(key));
            if (key === 'registrationId') continue; // extremely rare: pick a new ID
          }
          throw err;
        }
      }
      if (!doc) throw new Error('Could not allocate registration id');

      return res.status(201).json({
        ok: true,
        status: 'registered',
        message: 'Registered successfully!',
        registrationId: doc.registrationId,
        data: { fullName: doc.fullName, rollNumber: doc.rollNumber, email: doc.email },
      });
    } catch (err) {
      console.error('[register] error:', err.message);
      return res.status(500).json({ ok: false, status: 'server_error', message: 'Something went wrong on our side. Please try again in a moment.' });
    }
  });

  // --------------------------------------------------------------- ADMIN EXPORT
  // Open  /api/admin/registrations?key=YOUR_ADMIN_KEY            -> JSON
  // Open  /api/admin/registrations?key=YOUR_ADMIN_KEY&format=csv -> CSV (opens in Excel)
  app.get('/api/admin/registrations', async (req, res) => {
    const adminKey = env.ADMIN_KEY;
    if (!adminKey) return res.status(404).json({ ok: false, message: 'Admin export is disabled (ADMIN_KEY not set).' });
    const given = String(req.get('x-admin-key') || req.query.key || '');
    const a = Buffer.from(given), b = Buffer.from(adminKey);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(401).json({ ok: false, message: 'Unauthorized.' });

    const rows = await Registration.find().sort({ createdAt: 1 }).lean();
    if (req.query.format === 'csv') {
      const cols = ['registrationId', 'fullName', 'rollNumber', 'courseBranch', 'currentYear', 'whatsapp', 'email', 'interests', 'createdAt'];
      const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(','))].join('\n');
      res.set({ 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="artopia3-registrations.csv"' });
      return res.send('\uFEFF' + csv);
    }
    return res.json({ ok: true, count: rows.length, registrations: rows });
  });

  app.use('/api', (req, res) => res.status(404).json({ ok: false, message: 'Not found.' }));

  // ------------------------------------------- serve the built website (npm start)
  const dist = path.resolve(__dirname, '../dist');
  if (fs.existsSync(dist)) {
    app.use(express.static(dist));
    app.get('/{*splat}', (req, res) => res.sendFile(path.join(dist, 'index.html')));
  }

  // JSON parse errors etc.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const bad = err && (err.type === 'entity.parse.failed' || err.status === 400);
    res.status(bad ? 400 : 500).json({ ok: false, status: bad ? 'bad_request' : 'server_error', message: bad ? 'Invalid request.' : 'Something went wrong.' });
  });

  return app;
}
