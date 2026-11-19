import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    registrationId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    // Roll numbers can repeat across universities; collegeName identifies the institution.
    rollNumber: { type: String, required: true, uppercase: true, trim: true },
    collegeName: { type: String, required: true, trim: true, maxlength: 120 },
    courseBranch: { type: String, required: true, trim: true, maxlength: 60 },
    currentYear: { type: String, required: true },
    whatsapp: { type: String, required: true },
    // unique => the same email can never be saved twice
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    transactionId: { type: String, required: true, trim: true, minlength: 12, maxlength: 12 },
    interests: { type: [String], default: [] },
    agreedToWhatsappGroup: { type: Boolean, required: true },
  },
  { timestamps: true, autoIndex: false } // indexes are managed explicitly during startup
);

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
export default Registration;

/** Remove the legacy unique roll-number index without changing registration data. */
export async function prepareRegistrationIndexes() {
  const indexes = await Registration.collection.listIndexes().toArray().catch((error) => {
    if (error.codeName === 'NamespaceNotFound') return [];
    throw error;
  });
  const legacy = indexes.find((index) => index.unique && index.key?.rollNumber === 1 && Object.keys(index.key).length === 1);
  if (legacy) await Registration.collection.dropIndex(legacy.name);
  await Promise.all([
    Registration.collection.createIndex({ registrationId: 1 }, { unique: true }),
    Registration.collection.createIndex({ email: 1 }, { unique: true }),
  ]);
}
