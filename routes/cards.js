const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard,
  validateDeleteCard,
  validateLikeCard,
  validateDislikeCard,
} = require('../middlewares/joi');

router.get('/', getCards);
router.delete('/:cardId', validateDeleteCard, deleteCard);
router.post('/', validateCreateCard, createCard);
router.put('/:cardId/likes', validateLikeCard, likeCard);
router.delete('/:cardId/likes', validateDislikeCard, dislikeCard);

module.exports = router;
