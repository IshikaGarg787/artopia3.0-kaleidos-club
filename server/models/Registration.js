import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    registrationId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    collegeName: { type: String, required: true, trim: true, maxlength: 120 },
    collegeKey: { type: String, required: true, lowercase: true, trim: true, select: false },
    rollNumber: { type: String, required: true, uppercase: true, trim: true },
    courseBranch: { type: String, required: true, trim: true, maxlength: 60 },
    currentYear: { type: String, required: true },
    whatsapp: { type: String, required: true },
    // unique => the same email can never be saved twice
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    interests: { type: [String], default: [] },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

registrationSchema.index({ collegeKey: 1, rollNumber: 1 }, { unique: true, name: 'collegeKey_rollNumber_unique' });

export default mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
