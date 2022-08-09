const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const ShortUrl = require("./models/ShortUrl");
const port = 3000;
const shortUrl = require("./models/ShortUrl");
const generateShort = require("./tools/generate-shorUrl");
require("dotenv").config();
require("./config/mongoose");
//set view engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//set body-parser
app.use(express.urlencoded({ extended: true }));

//listen server
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/short/create", (req, res) => {
  const { url } = req.body;
  const short = generateShort();
  shortUrl.create({ origin: url, short: short });
  res.render("index", { short });
});

app.get("/:short", (req, res) => {
  const short = req.params.short;
  ShortUrl.findOne({ short })
    .lean()
    .then((url) => {
      res.redirect(url.origin);
    });
});

app.post("*", (req, res) => {
  res.send("what!!!?", 404);
});
