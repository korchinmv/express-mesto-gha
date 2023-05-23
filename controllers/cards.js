const cardModel = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await cardModel.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error"',
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
    const deletedCard = await cardModel.findByIdAndDelete(req.params.cardId);
    res.send({ data: deletedCard });
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
};
