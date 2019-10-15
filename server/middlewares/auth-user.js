const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  // Get Token from header
  const token = req.header("X-auth-token");
  // check token
  if (!token) {
    return res.status(400).json({ msg: "접근이 거부되었습니다" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "올바른 토큰이 아닙니다" });
  }
};

module.exports = authUser;
