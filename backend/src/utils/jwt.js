const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, "secureAt", { expiresIn: '40m' });
};

const verifyToken = (token) => {
  return jwt.verify(token, "secureAt");
};

module.exports = { generateToken, verifyToken };