const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers, getUser, createUser, getUserById, updateUser, updateAvatar, login,
} = require('../controllers/users');
const {
  validateSignUp,
  validateSignIn,
  validateUpdateUser,
  validateUpdateAvatar,
  validateFindById,
} = require('../middlewares/joi');

router.get('/', auth, getUsers);
router.get('/me', auth, getUser);
router.get('/:userId', validateFindById, auth, getUserById);
router.patch('/me', validateUpdateUser, auth, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, auth, updateAvatar);
router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

module.exports = router;
