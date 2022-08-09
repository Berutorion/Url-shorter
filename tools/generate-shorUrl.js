const shortUrl = require("../models/ShortUrl");
//degfine generatePassword function
function generatePassword() {
  //define things user might want
  const lowerCaseLetter = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetter = lowerCaseLetter.toUpperCase();
  const numbers = "1234567890";
  const length = 5;

  // create a collection
  let collection = [];
  collection = collection.concat(lowerCaseLetter.split(""));
  collection = collection.concat(...upperCaseLetter);
  collection = collection.concat(numbers.split(""));

  //check collection
  if (collection.length === 0) {
    return "There is no valid character in your selection.";
  }
  //start generate password
  let shorturl = "";
  for (let i = 0; i < length; i++) {
    shorturl += sample(collection);
  }

  if (checkShorUrl(shorturl)) {
    return shorturl;
  } else {
    generatePassword();
  }
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function checkShorUrl(shorturl) {
  //如果短網址為重複的重新生成
  const short = await shortUrl.findOne({ short: shorturl }).lean();
  if (short) {
    console.log("not null", short, shorturl);
    return false;
  } else {
    console.log("null");
    return true;
  }
}

module.exports = generatePassword;
