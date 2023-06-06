const cardModel = require('../models/card');

const {
  // eslint-disable-next-line max-len
  messageNotCard, messageNoRights, messageDataError, messageNotFound, messageServerError, CREATED, BAD_REQUEST, NOT_FOUND, SERVER_ERROR,
} = require('../utils/responses');

const getCards = async (req, res) => {
  try {
    const cards = await cardModel.find({});
    res.send(cards);
  } catch (error) {
    res.status(SERVER_ERROR).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

// eslint-disable-next-line consistent-return
const createCard = async (req, res) => {
  try {
    const card = await cardModel.create({ ...req.body, owner: req.user._id });
    res.status(CREATED).send({ data: card });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: `${messageDataError} при создании карточки` });
    }

    res.status(SERVER_ERROR).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

// eslint-disable-next-line consistent-return
const deleteCard = async (req, res) => {
  try {
    const ownCard = await cardModel.findById(req.params.cardId).orFail(new Error('DocumentNotFoundError'));
    if (ownCard.owner.toString() !== req.params.cardId) {
      return res.status(403).send({ message: messageNoRights });
    }
    await cardModel.deleteOne(ownCard._id);
    res.send({ data: ownCard });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: `${messageNotCard}` });
    } if (error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: `${messageNotFound}` });
    }

    res.status(SERVER_ERROR).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

// eslint-disable-next-line consistent-return
const likeCard = async (req, res) => {
  try {
    const licked = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NoValidId'));
    res.send({ data: licked });
  } catch (error) {
    if (error.message === 'NoValidId' || error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: messageNotFound });
    } if (error.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: messageDataError });
    }

    res.status(SERVER_ERROR).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

// eslint-disable-next-line consistent-return
const dislikeCard = async (req, res) => {
  try {
    const disliked = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NoValidId'));
    res.send({ data: disliked });
  } catch (error) {
    if (error.message === 'NoValidId' || error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: messageNotFound });
    } if (error.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: messageDataError });
    }

    res.status(SERVER_ERROR).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
