const cardModel = require('../models/card');

const messageNotCard = 'Карточка с указанным id не найдена';
const messageDataError = 'Переданы некорректные данные';
const messageNotFound = 'Передан несуществующий id карточки';
const messageServerError = 'Ошибка сервера';
const created = 201;
const badRequest = 400;
const notFound = 404;
const internslServerError = 500;

const getCards = async (req, res) => {
  try {
    const cards = await cardModel.find({});
    res.send(cards);
  } catch (error) {
    res.status(internslServerError).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await cardModel.create({ ...req.body, owner: req.user._id });
    res.status(201).send({ data: card });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error"',
      error: error.message,
      stack: error.stack,
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const deletedCard = await cardModel.findByIdAndDelete(req.params.cardId).orFail(new Error('DocumentNotFoundError'));
    res.send({ data: deletedCard });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error"',
      error: error.message,
      stack: error.stack,
    });
  }
};

const likeCard = async (req, res) => {
  try {
    const licked = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    res.send({ data: licked });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error"',
      error: error.message,
      stack: error.stack,
    });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const disliked = await cardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    res.send({ data: disliked });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error"',
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
