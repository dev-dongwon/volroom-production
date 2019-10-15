const jwt = require("jsonwebtoken");

const generateJwtToken = async ({id, name, email, photo, google_auth}) => {
  const payload = {
    user: {
      id, name, email, photo, google_auth
    }
  };

  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "12h"
  });
};

module.exports = generateJwtToken;
