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
  if (!origin.includes("http://") && !origin.includes("https://"))
    return res.render("index", { message: "網址格式錯誤，請重新輸入" });
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
      console.log(err, "short-post");
      res.render("index", { message: "無效的輸入值，請重新輸入" });
    }
  }
});

app.get("/:short", async (req, res) => {
  const short = req.params.short;
  try {
    const url = await ShortUrl.findOne({ short }).lean();
    res.redirect(url.origin);
  } catch (err) {
    console.log(err);
    res.render("error");
  }
});

app.post("*", (req, res) => {
  res.render("error");
});
