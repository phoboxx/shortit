const randomString = (numberOfChar) => {
  // This functions takes a number of characters and generates a random number of characters.
  const possibleChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let finalString = '';
  for (let i = 0; i < numberOfChar; i++) {
    let randomChar = Math.floor(Math.random() * possibleChar.length);
    finalString += possibleChar[randomChar];
  }

  return finalString;
};

module.exports = { randomString };
