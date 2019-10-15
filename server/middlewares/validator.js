const { check, validationResult } = require("express-validator");

const validator = {
  user: [
    check("name", "이름은 반드시 기입해야 합니다")
      .not()
      .isEmpty(),
    check("email", "이메일 형식이 맞지 않습니다").isEmail(),
    check("password", "비밀번호는 6자 이상이어야 합니다").isLength({ min: 6 })
  ],
  auth: [
    check('email', '이메일 형식이 맞지 않습니다').isEmail(),
    check('password', '비밀번호를 입력해주세요').exists()
  ],
};

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validator,
  checkValidation
};
