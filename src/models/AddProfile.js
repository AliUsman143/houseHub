import mongoose from 'mongoose';

const addprofileuserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phoneNo: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[\d\s+-]{10,15}$/, 'Please provide a valid phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  profilePicture: {
    type: String, // Will store the URL to the image
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Prevent model overwrite upon hot reload
const AddProfileUser = mongoose.models.AddProfileUser || mongoose.model('AddProfileUser', addprofileuserSchema);

export default AddProfileUser;


// import mongoose from 'mongoose';
// const addprofileuserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phoneNo: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// const AddProfileUser = mongoose.models.AddProfileUser || mongoose.model('AddProfileUser', addprofileuserSchema);
// export default AddProfileUser;