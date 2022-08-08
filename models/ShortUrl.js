const mongoose = require("mongoose");

const shorUrlSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  origin: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    max: 5,
  },
});

module.exports = mongoose.model("ShorUrl", shorUrlSchema);
