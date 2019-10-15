const { User } = require("../models");

const instructions = {
  readUserData: async id => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] }
    });
    return user;
  },

  createUser: async ({ name, email, password }) => {
    const user = await User.create({ name, email, password });
    return user;
  },

  isDupleUser: async email => {
    let flag = false;
    const user = await User.findOne({ where: { email } });
    if (user) {
      flag = true;
    }
    return flag;
  },

  getUserByEmail: async email => {
    const user = await User.findOne({
      where: { email }
    });
    return user;
  }
};

module.exports = instructions;
