const userModel = require('../models/user');

const messageNotUser = 'Пользователь с указанным id не найден';
const messageDataError = 'Переданы некорректные данные';
const messageServerError = 'Ошибка сервера';
const CREATED = 201;
const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

// eslint-disable-next-line consistent-return
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId).orFail(new Error('NotValidId'));
    res.send({ data: user });
  } catch (error) {
    if (error.message === 'NotValidId') {
      return res.status(NOT_FOUND).send({ message: messageNotUser });
    } if (error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: messageNotUser });
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
const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(CREATED).send({ data: user });
  } catch (error) {
    if (error.name === 'ValidationError') {
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
const updateUser = async (req, res) => {
  try {
    // eslint-disable-next-line max-len
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).orFail(new Error('NotValidData'));
    res.status(OK).send({ data: updatedUser });
  } catch (error) {
    if (error.message === 'NotValidData' || error.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: messageDataError });
    } if (error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: messageNotUser });
    }

    res.status(SERVER_ERROR).send({
      message: messageServerError,
      error: error.message,
      stack: error.stack,
    });
  }
};

// eslint-disable-next-line consistent-return
const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    // eslint-disable-next-line max-len
    const updatedAvatar = await userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true });
    res.status(OK).send({ data: updatedAvatar });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST).send({ message: messageDataError });
    } if (error.name === 'Error') {
      return res.status(NOT_FOUND).send({ message: messageNotUser });
    }

    res.status(SERVER_ERROR).send({
      message: messageServerError,
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
