const mongoose = require('mongoose');

const { Schema } = mongoose;

const MembersSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, require: true },
  member: { type: Boolean, default: false },
});

module.exports = mongoose.model('Members', MembersSchema);
