import mongoose from 'mongoose';
import Registration from './models/Registration.js';
import { createApp } from './app.js';

const app = createApp({ Registration });
let connection;

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return;
  if (!connection) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not configured.');
    connection = mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
      .then(() => Registration.init())
      .catch((error) => { connection = null; throw error; });
  }
  await connection;
}

export default async function handler(req, res) {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error('[vercel-api] database connection failed:', error.message);
    return res.status(503).json({ ok: false, status: 'server_error', message: 'The registration service is temporarily unavailable.' });
  }
}
