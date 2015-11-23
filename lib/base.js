var mapOnes = {
  0: "",
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
}

var mapTens = {
  10: "Ten",
  11: "Eleven",
  12: "Twelve",
  13: "Thirteen",
  14: "Fourteen",
  15: "Fifteen",
  16: "Sixteen",
  17: "Seventeen",
  18: "Eighteen",
  19: "Nineteen",
}

var mapTenths = {
  2: "Twenty",
  3: "Thirty",
  4: "Forty",
  5: "Fifty",
  6: "Sixty",
  7: "Seventy",
  8: "Eighty",
  9: "Ninety",
}

function int(val) {
  return parseInt(val);
}

function str(val) {
  return val.toString();
}


// Convert ones number to word.
// ----------
// Parameters
// ----------
// num: int
//     Single digit integer number
function convertOnes(num) {
  if (str(num).length > 1) {
    throw new Error("Must have at most 1 digit");
  }

  num = int(num);
  return mapOnes[num];
}


// Convert tenths number to word.
// ----------
// Parameters
// ----------
// num: int
//     Double digit integer number
function convertTenths(num) {
  if (str(num).length > 2) {
    throw new Error("Must have at most 2 digits");
  }

  num = int(num);
  var bases = "";

  // less than 10
  if (num < 10) {
    return mapOnes[num];
  }


  // 10-19
  if (10 <= num && num < 20) {
    return mapTens[num];
  }

  // 20-99
  var firstNum = mapTenths[int(str(num)[0])];
  var secondNum = mapOnes[int(str(num)[1])];

  if (!secondNum) {
    return firstNum;
  }

  return firstNum + " " + secondNum;
}


// Given hundredth, tenth and one integer number for base (e.g. Billion, Million), return converted word
// ----------
// Parameters
// ----------
// hundredth: int
//     Hundredth number
// tenth: int
//     Tenth number
// one: int
//     One number
// base: string
//     Base value
function getDollar(hundredth, tenth, one, base) {
  var dollarWord = "";
  if (hundredth) {
    dollarWord += convertOnes(hundredth) + " Hundred";
  }

  // Add "And" if there's numbers after hundredths
  if (hundredth && (tenth || one)) {
    dollarWord += " And ";
  }

  if (tenth || one) {
    dollarWord += convertTenths(int(str(tenth) + str(one)));
  }

  if (base) {
    dollarWord += " " + base;
  }

  return dollarWord;
}


function getBillion(hundredth, tenth, one) {
  return getDollar(hundredth, tenth, one, "Billion");
}


function getMillion(hundredth, tenth, one) {
  return getDollar(hundredth, tenth, one, "Million");
}


function getThousand(hundredth, tenth, one) {
  return getDollar(hundredth, tenth, one, "Thousand");
}


function getOne(hundredth, tenth, one) {
  return getDollar(hundredth, tenth, one, "");
}

// Given tenth and one integer number (for cent), return converted word
// ----------
// Parameters
// ----------
// tenth: int
//     Tenth number
// one: int
//     One number
function getCent(tenth, one) {
  var centWord = "";
  if (tenth || one) {
    centWord += convertTenths(int(str(tenth) + str(one)));
  }

  if (centWord) {
    centWord = "Cents " + centWord + " ";
  }

  return centWord;
}


function getIndex(val, index, defaultVal) {
  defaultVal = defaultVal || 0;
  if (val[index] === undefined) {
    return defaultVal;
  } else {
    return val[index];
  }
}


// Given a max 3 character number, extract and return hundredth, tenth and one value.
// Return array in format [int, int, int] for values [hundredth, tenth, one]
// ----------
// Parameters
// ----------
// num: string
//     Number in string
//
function extract(num) {
  var hundredth = 0;
  var tenth = 0;
  var one = 0;
  if (num.length === 3) {
    hundredth = int(num[0]);
    tenth = int(num[1]);
    one = int(num[2]);
  }

  if (num.length === 2) {
    tenth = int(num[0]);
    one = int(num[1]);
  }

  if (num.length === 1) {
    one = int(num[0]);
  }

  return [hundredth, tenth, one];
}


// Generate word for dollar
// ----------
// Parameters
// ----------
// num: string
//     Dollar number in string
function generateDollarWord(num) {
  var word = "";
  var billionNum;
  var millionNum;
  var thousandNum;
  var oneNum;
  var hundredth;
  var tenth;
  var one;
  var extractArr;

  // at least 1 billion
  if (num.length > 9) {
    billionNum = int(num.slice(0, num.length - 9));
    num = str(int(num) - (billionNum * int(1e9)));
    extractArr = extract(str(billionNum));
    hundredth = extractArr[0];
    tenth = extractArr[1];
    one = extractArr[2];
    word += getBillion(hundredth, tenth, one) + " ";
  }

  // at least 1 million
  if (num.length > 6) {
    millionNum = int(num.slice(0, num.length - 6));
    num = str(int(num) - (millionNum * int(1e6)));
    extractArr = extract(str(millionNum));
    hundredth = extractArr[0];
    tenth = extractArr[1];
    one = extractArr[2];
    word += getMillion(hundredth, tenth, one) + " ";
  }

  // at least 1 thousand
  if (num.length > 3) {
    thousandNum = int(num.slice(0, num.length - 3));
    num = str(int(num) - (thousandNum * int(1e3)));
    extractArr = extract(str(thousandNum));
    hundredth = extractArr[0];
    tenth = extractArr[1];
    one = extractArr[2];
    word += getThousand(hundredth, tenth, one) + " ";
  }

  // at least 1
  if (int(num) && num.length > 0) {
    oneNum = int(num.slice(0, num.length));
    num = str(int(num) - oneNum);
    extractArr = extract(str(oneNum));

    hundredth = extractArr[0];
    tenth = extractArr[1];
    one = extractArr[2];
    word += getOne(hundredth, tenth, one) + " ";
  }

  return word;
}


// Generate word for cent
// ----------
// Parameters
// ----------
// num: string
//     Cent number in string
function generateCentWord(num) {
  var word = "";
  var hundredth;
  var tenth;
  var one;
  var extractArr;

  extractArr = extract(str(num));
  hundredth = extractArr[0];
  tenth = extractArr[1];
  one = extractArr[2];
  word += getCent(tenth, one);
  return word;
}


function validate(amt) {
  // amt MUST be in string to avoid accidental round off
  if (parseFloat(amt) > parseFloat(1e11)) {
    throw new Error("Please enter an amount smaller than 100 billion");
  }

  if (getIndex(amt.split("."), 1, "").length > 2) {
    throw new Error("Please enter an amount within 2 decimal place");
  }
}


function generateWord(amt) {
  var amtList;
  var dollarAmt;
  var centAmt;
  var dollarWord;
  var centWord;

  // remove commas and spaces from word
  amt = amt.replace(/,/g, "").replace(/ /g, "");
  validate(amt);

  amt = str(parseFloat(amt).toFixed(2));
  amtList = amt.split(".");
  dollarAmt = getIndex(amtList, 0);
  centAmt = getIndex(amtList, 1);

  dollarWord = generateDollarWord(dollarAmt);
  centWord = generateCentWord(centAmt);

  if (!dollarWord) {
    return centWord + "Only";
  }

  if (!centWord) {
    return dollarWord + "Only";
  }

  return dollarWord + "And " + centWord + "Only";
}


module.exports = generateWord;
