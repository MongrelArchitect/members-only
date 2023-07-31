const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: {
    minLength: 1,
    maxLength: 255,
    type: String,
    required: true,
  },
  lastName: {
    minLength: 1, maxLength: 255, type: String, required: true,
  },
  member: { type: Boolean, required: true },
  password: { type: String, required: true },
});

UserSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
