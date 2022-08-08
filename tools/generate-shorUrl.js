const shortUrl = require("../models/ShortUrl");
//degfine generatePassword function
function generatePassword(origin) {
  //define things user might want
  const lowerCaseLetter = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetter = lowerCaseLetter.toUpperCase();
  const numbers = "1234567890";
  const length = 5;
  //check password length
  if (option.length == "") {
    return "Please set almost one for password length";
  }

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
  checkShorUrl(shorurl);
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function checkShorUrl(shorurl) {
  shortUrl.find({ short: shorurl });
}

module.exports = generatePassword;
