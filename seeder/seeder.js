const connection = require("../config/mongoose");
const shortUrl = require("../models/ShortUrl");

connection.once("open", () => {
  shortUrl
    .create({ name: "test", origin: "http://google.com", short: "Ab019" })
    .then(() => {
      console.log("create success");
    })
    .catch((err) => {
      console.log(err);
    });
});
