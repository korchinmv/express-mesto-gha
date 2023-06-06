const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');

const { auth } = require('../middlewares/auth');

const notFound = 404;
const badRequest = 'Страница не найдена';

router.use('/users', userRouter);
router.use('/cards', auth, cardsRouter);
router.use((req, res, next) => {
  next(res.status(notFound).send({ message: badRequest }));
});

module.exports = router;
