const LoginLog = require("../mongoDB/models/login-log");

const logController = {
  getUserLog: async (req, res, next) => {
    const result = await LoginLog.find();
    return res.json(result);
  }
};

module.exports = logController;
