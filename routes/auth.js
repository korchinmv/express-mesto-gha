const router = require('express').Router();
const {
  createUser, login,
} = require('../controllers/users');
const {
  validateSignUp,
  validateSignIn,
} = require('../middlewares/joi');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

module.exports = router;
