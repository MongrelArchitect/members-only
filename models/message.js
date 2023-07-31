const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  title: { type: String, required: true },
  user: { ref: 'User', type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Message', MessageSchema);
