const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  const user = decodedToken.user;
  return user;
}

module.exports = verifyToken;
