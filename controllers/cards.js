const cardModel = require('../models/card');

const {
  // eslint-disable-next-line max-len
  messageNotCard, messageNoRights, messageDataError, messageNotFound, CREATED,
} = require('../utils/responses');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await cardModel.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const createCard = async (req, res, next) => {
  try {
    const card = await cardModel.create({ ...req.body, owner: req.user._id });
    res.status(CREATED).send({ data: card });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(`${messageDataError} при создании карточки`));
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const deleteCard = async (req, res, next) => {
  try {
    const ownCard = await cardModel.findById(req.params.cardId);
    if (ownCard.owner.toString() !== req.params.cardId) {
      next(new ForbiddenError(messageNoRights));
    } if (!ownCard) {
      next(new NotFoundError(messageNotFound));
    }
    await cardModel.deleteOne(ownCard._id);
    res.status(200).send({ data: ownCard });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ValidationError(messageNotCard));
    } if (error.name === 'Error') {
      next(new NotFoundError(messageNotFound));
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const likeCard = async (req, res, next) => {
  try {
    const licked = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!licked) {
      next(new NotFoundError(messageNotFound));
    }

    res.send({ data: licked });
  } catch (error) {
    if (error.message === 'NoValidId' || error.name === 'Error') {
      next(new NotFoundError(messageNotFound));
    } if (error.name === 'CastError') {
      next(new ValidationError(messageDataError));
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const dislikeCard = async (req, res, next) => {
  try {
    const disliked = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!disliked) {
      next(new NotFoundError(messageNotFound));
    }
    res.send({ data: disliked });
  } catch (error) {
    if (error.message === 'NoValidId' || error.name === 'Error') {
      next(new NotFoundError(messageNotFound));
    } if (error.name === 'CastError') {
      next(new ValidationError(messageDataError));
    }
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
