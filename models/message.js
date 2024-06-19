const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessagesSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
});

// virtual for formatting date

module.exports = mongoose.model('Messages', MessagesSchema);
