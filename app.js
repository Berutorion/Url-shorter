const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
require("dotenv").config();
require("./config/mongoose");
//set view engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
//listen server
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.render("index");
});
