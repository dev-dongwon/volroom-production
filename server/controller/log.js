const LoginLog = require("../mongoDB/models/login-log");

const logController = {
  getUserLog: async (req, res, next) => {
    const result = await LoginLog.find();
    console.log(result);
    return res.json(result);
  }
};

module.exports = logController;
