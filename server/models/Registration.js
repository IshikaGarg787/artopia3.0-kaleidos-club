import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    registrationId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    // unique => the same roll number can never be saved twice
    rollNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    courseBranch: { type: String, required: true, trim: true, maxlength: 60 },
    currentYear: { type: String, required: true },
    whatsapp: { type: String, required: true },
    // unique => the same email can never be saved twice
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    interests: { type: [String], default: [] },
    agreedToWhatsappGroup: { type: Boolean, required: true },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

export default mongoose.models.Registration || mongoose.model('Registration', registrationSchema);
