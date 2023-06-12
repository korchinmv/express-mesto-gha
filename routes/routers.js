const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');
const notFound = require('../controllers/notFound');

const { auth } = require('../middlewares/auth');

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/cards', auth, cardsRouter);
router.use(auth, notFound);

module.exports = router;
