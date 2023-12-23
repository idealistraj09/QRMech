import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  emailVerified: Boolean,
  profilePicture: String,
  email: String,
  name: String,
  username: String,
  bio: String,
  carnickname: String,
  carmodelname: String,
  carnoplate: String,
  password: String,
});

let Users;
try {
  // If the model already exists, use it
  Users = mongoose.model('User');
} catch(error) {
  // If the model doesn't exist, create and export it
  Users = mongoose.model('User', userSchema);
  console.log(error);
}
console.log(Users);

export default Users;
