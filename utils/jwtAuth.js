const jwt = require('jsonwebtoken');

const SECRET_KEY = 'super-secret-key';

const generateToken = (payload, time) => jwt.sign(payload, SECRET_KEY, { expiresIn: time });

const checkToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  generateToken,
  checkToken,
};
