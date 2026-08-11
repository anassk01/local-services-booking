const jwt = require("jsonwebtoken");

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
}

module.exports = generateToken;
