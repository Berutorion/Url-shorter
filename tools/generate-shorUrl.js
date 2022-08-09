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
  let shorurl = "";
  for (let i = 0; i < length; i++) {
    shorurl += sample(collection);
  }
  return shorurl;
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function checkShorUrl(shorurl) {
  shortUrl.find({ short: shorurl }).then((short) => {
    //如果短網址為重複的重新生成
    if (short.length > 0) {
      generatePassword();
    } else {
      return true;
    }
  });
}

module.exports = generatePassword;
