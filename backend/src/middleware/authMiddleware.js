const jwt = require('../utils/jwt');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  jwt.verifyToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(() => res.sendStatus(401));
};

module.exports = { authenticateToken };