const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, require: true },
  member: { type: Boolean, default: false },
  admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('Users', UserSchema);
