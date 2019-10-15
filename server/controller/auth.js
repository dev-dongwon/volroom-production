const { getUserByEmail } = require("../db/instructions/user"),
      generateJwtToken   = require('../utils/generate-jwt'),
      bcrypt             = require('bcryptjs');

const controller = {
  // 유저 로그인
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(400).json({ msg: '아이디 또는 비밀번호가 일치하지 않습니다' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: '아이디 또는 비밀번호가 일치하지 않습니다' });
      }

      const token = await generateJwtToken(user);
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  },
  // check Login
  getUser: async (req, res) => {
    const user = req.user;
    return res.json(user);
  }
};

module.exports = controller;
