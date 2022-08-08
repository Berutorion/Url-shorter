require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connect to mongoDB.");
  })
  .catch((err) => {
    console.log("Has some problem", err);
  });

const db = mongoose.connection;

module.exports = db;
