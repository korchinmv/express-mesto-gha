const userModel = require('../models/user');

const messageNotCard = 'Карточка с указанным id не найдена';
const messageDataError = 'Переданы некорректные данные';
const messageNotFound = 'Передан несуществующий id карточки';
const messageServerError = 'Ошибка сервера';
const created = 201;
const badRequest = 400;
const notFound = 404;
const internslServerError = 500;

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error',
      error: error.message,
      stack: error.stack,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.send({ data: user });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error',
      error: error.message,
      stack: error.stack,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).send({ data: user });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error',
      error: error.message,
      stack: error.stack,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.status(201).send({ data: updatedUser });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error',
      error: error.message,
      stack: error.stack,
    });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    // eslint-disable-next-line max-len
    const updatedAvatar = await userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    res.status(201).send({ data: updatedAvatar });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Sever Error',
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
};
