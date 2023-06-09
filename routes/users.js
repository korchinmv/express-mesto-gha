const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers, getUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const {
  validateUpdateUser,
  validateUpdateAvatar,
  validateFindById,
} = require('../middlewares/joi');

router.get('/', auth, getUsers);
router.get('/me', auth, getUser);
router.get('/:userId', auth, validateFindById, getUserById);
router.patch('/me', auth, validateUpdateUser, updateUser);
router.patch('/me/avatar', auth, validateUpdateAvatar, updateAvatar);

module.exports = router;
