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
router.get('/:userId', auth, validateFindById, getUserById);
router.patch('/me', auth, validateUpdateUser, updateUser);
router.patch('/me/avatar', auth, validateUpdateAvatar, updateAvatar);
router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

module.exports = router;
