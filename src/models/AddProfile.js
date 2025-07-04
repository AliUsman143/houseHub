import mongoose from 'mongoose';

const AddProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
}, { timestamps: true });

export default mongoose.models.AddProfileUser || mongoose.model('AddProfileUser', AddProfileSchema);