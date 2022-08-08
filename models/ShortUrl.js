const mongoose = require("mongoose");

const shorUrlSchema = new mongoose.Schema({
  name: {
    type: string,
    default: null,
  },
  origin: {
    type: string,
    required: true,
  },
  shor: {
    type: string,
    max: 5,
  },
});

module.exports = mongoose.model("ShorUrl", shorUrlSchema);
