const bcrypt = require('bcryptjs');

const isMatch = (passedPassword, hashedPassword) =>
  bcrypt.compareSync(passedPassword, hashedPassword);

module.exports = isMatch;
