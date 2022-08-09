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

app.post("/short", async (req, res) => {
  let origin = req.body.origin.trim();
  console.log(origin);
  //如果傳入的原始網址資料庫有，就不生成新的短網址
  const url = await shortUrl.findOne({ origin }).lean();
  if (url) {
    res.render("index", { short: url.short });
  } else {
    try {
      const short = generateShort();
      await shortUrl.create({ origin, short });
      res.render("index", { short });
    } catch (err) {
      console.log(err);
      res.render("index", { message: "無效的輸入值" });
    }
  }
});

app.get("/short/:short", (req, res) => {
  const short = req.params.short;
  ShortUrl.findOne({ short })
    .lean()
    .then((url) => {
      res.redirect(url.origin);
    })
    .catch((err) => {
      cosole.log(err);
    });
});

app.post("*", (req, res) => {
  res.send("what!!!?", 404);
});

app.get("/test", (req, res) => {
  console.log(generateShort());
  res.send("test");
});
