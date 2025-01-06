const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  date: { type: String, required: true }, // ISO date string
  events: [
    {
      name: { type: String, required: true },
      time: { type: String, required: true }, // ISO time string
    },
  ],
});

module.exports = mongoose.model("Event", EventSchema);
