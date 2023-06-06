const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers, createUser, getUserById, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);
router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
