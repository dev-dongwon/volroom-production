const LoginLog = require("../mongoDB/models/login-log");

const loginLogger = async (req, res, next) => {
  const { os, browser } = req.body;
  
  try {
    const log = new LoginLog({
      os,
      browser
    });
  
    const result = await log.save();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loginLogger;