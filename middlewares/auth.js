const { messageAuthorizationError } = require('../utils/responses');
const { checkToken } = require('../utils/jwtAuth');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: messageAuthorizationError });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = checkToken(token);
    req.user = payload;
  } catch (error) {
    return res.status(401).send({ message: messageAuthorizationError });
  }

  next();
};

module.exports = {
  auth,
};
