const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');
const NotFoundError = require('../errors/NotFoundError');
const messageBadRequest = require('../utils/responses');

const { auth } = require('../middlewares/auth');

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/cards', auth, cardsRouter);
router.use(auth, (req, res, next) => {
  next(NotFoundError(messageBadRequest));
});

module.exports = router;
