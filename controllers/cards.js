const cardModel = require('../models/card');

const messageNotCard = 'Карточка с указанным id не найдена';
const messageDataError = 'Переданы некорректные данные';
const messageNotFound = 'Передан несуществующий id карточки';
const messageServerError = 'Ошибка сервера';
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

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
    const deletedCard = await cardModel.findByIdAndDelete(req.params.cardId).orFail(new Error('DocumentNotFoundError'));
    res.send({ data: deletedCard });
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
    );
    res.send({ data: licked });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: messageDataError });
    } if (error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: messageNotFound });
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
    );
    res.send({ data: disliked });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: messageDataError });
    } if (error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: messageNotFound });
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
