const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['normal', 'admin'],
    required: [true, 'user role not provided'],
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = { User };
