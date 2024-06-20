const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const MessagesSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
});

// virtual for formatting date
MessagesSchema.virtual("cleanDate").get(function() {
  return DateTime.fromJSDate(this.time).toLocaleString(DateTime.DATETIME_MED)
})

module.exports = mongoose.model('Messages', MessagesSchema);
