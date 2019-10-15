exports.encode = function(string) {
  var alphaLower = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  var alphaUpper = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  var splitString = string.split("");
  var encodedStringArray = [];

  for (i = 0; i < splitString.length; i++) {
    if (alphaLower.includes(splitString[i])) {
      encodedStringArray.push(
        alphaLower[(alphaLower.indexOf(splitString[i]) + 1) % 26]
      );
    } else if (alphaUpper.includes(splitString[i])) {
      encodedStringArray.push(
        alphaUpper[(alphaUpper.indexOf(splitString[i]) + 1) % 26]
      );
    } else {
      encodedStringArray.push(splitString[i]);
    }
  }

  return encodedStringArray.join("");
};

exports.decode = function(string) {
  var alphaLower = [
    "z",
    "y",
    "x",
    "w",
    "v",
    "u",
    "t",
    "s",
    "r",
    "q",
    "p",
    "o",
    "n",
    "m",
    "l",
    "k",
    "j",
    "i",
    "h",
    "g",
    "f",
    "e",
    "d",
    "c",
    "b",
    "a"
  ];
  var alphaUpper = [
    "Z",
    "Y",
    "X",
    "W",
    "V",
    "U",
    "T",
    "S",
    "R",
    "Q",
    "P",
    "O",
    "N",
    "M",
    "L",
    "K",
    "J",
    "I",
    "H",
    "G",
    "F",
    "E",
    "D",
    "C",
    "B",
    "A"
  ];
  var splitString = string.split("");
  var encodedStringArray = [];

  for (i = 0; i < splitString.length; i++) {
    if (alphaLower.includes(splitString[i])) {
      encodedStringArray.push(
        alphaLower[(alphaLower.indexOf(splitString[i]) + 1) % 26]
      );
    } else if (alphaUpper.includes(splitString[i])) {
      encodedStringArray.push(
        alphaUpper[(alphaUpper.indexOf(splitString[i]) + 1) % 26]
      );
    } else {
      encodedStringArray.push(splitString[i]);
    }
  }

  return encodedStringArray.join("");
};
