const mongoose = require("mongoose");

var EventSchema = new mongoose.Schema(
  {
    blockNumber: {
      type: Number,
      index: true,
    },
    transactionIndex: {
      type: Number,
      index: true,
    },
    address: {
      type: String,
      index: true,
      lowercase: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { strict: false }
);
var EventModel = mongoose.model("events", EventSchema);

module.exports = EventModel;
