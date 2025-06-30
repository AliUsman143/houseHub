import mongoose from 'mongoose';

const addprofileuserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const AddProfileUser = mongoose.models.AddProfileUser || mongoose.model('AddProfileUser', addprofileuserSchema);

export default AddProfileUser;