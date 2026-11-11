import 'dotenv/config';
import mongoose from 'mongoose';
import Registration from './models/Registration.js';
import { createApp } from './app.js';

const { MONGODB_URI, PORT = 5001 } = process.env;

if (!MONGODB_URI) {
  console.error('\n❌ MONGODB_URI is missing.\n   1) Copy .env.example to a new file named .env\n   2) Paste your MongoDB Atlas connection string into it\n   3) Run the server again\n');
  process.exit(1);
}

try {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await Registration.init(); // makes sure the "unique" indexes exist
  console.log('✅ Connected to MongoDB Atlas');
} catch (err) {
  console.error('\n❌ Could not connect to MongoDB Atlas:', err.message);
  console.error('   Check: (a) your password in MONGODB_URI, (b) Atlas > Network Access allows your IP, (c) your internet.\n');
  process.exit(1);
}

createApp({ Registration }).listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
