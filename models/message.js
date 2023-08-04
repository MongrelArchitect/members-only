const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  text: {
    maxLength: 500,
    minLength: 1,
    required: true,
    type: String,
  },
  timestamp: { required: true, type: Date },
  title: {
    maxLength: 50, minLength: 1, required: true, type: String,
  },
  user: { ref: 'User', required: true, type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Message', MessageSchema);
