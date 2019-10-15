const bcrypt = require('bcryptjs');
require("dotenv").config({
  path : "./../../.env"
});

const SALT_ROUND = process.env.SALT_ROUND;

const encryptPassword = async (password) => {
  const salt =  await bcrypt.genSalt(Number(SALT_ROUND));
  return await bcrypt.hash(password, salt);
}

module.exports = encryptPassword;