import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default model('User', UserSchema);
