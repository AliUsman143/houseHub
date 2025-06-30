import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  propertyAddress: {
    type: String,
    required: [true, 'Property address is required']
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Format date before returning
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  user.dateAdded = new Date(user.dateAdded).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  return user;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;