const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  admin: { required: true, type: Boolean },
  email: {
    maxLength: 254,
    minLength: 3,
    required: true,
    type: String,
  },
  firstName: {
    maxLength: 255,
    minLength: 1,
    required: true,
    type: String,
  },
  lastName: {
    maxLength: 255,
    minLength: 1,
    required: true,
    type: String,
  },
  member: { required: true, type: Boolean },
  password: { required: true, type: String },
});

UserSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
