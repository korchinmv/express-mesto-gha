const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const {
  // eslint-disable-next-line max-len
  messageNotUser, messageDataError, messageServerError, messageErrorEmailOrPassword, CREATED, BAD_REQUEST, NOT_FOUND, SERVER_ERROR,
} = require('../utils/responses');
const { generateToken } = require('../utils/jwtAuth');

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
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).orFail(new Error('NotValidId'));
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
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  try {
    const user = await userModel.create({
      password: hashPassword,
      name,
      about,
      avatar,
      email,
    });
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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select('+password').orFail(new Error('UnauthorizedError'));
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).send({ message: messageErrorEmailOrPassword });
      return;
    }
    const token = generateToken({ _id: user._id }, '7d');
    res.send({ token });
  } catch (error) {
    if (error.message === 'UnauthorizedError') {
      res.status(401).send({ message: messageErrorEmailOrPassword });
      return;
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
    res.send({ data: updatedUser });
  } catch (error) {
    if (error.message === 'NotValidData') {
      return res.status(NOT_FOUND).send({ message: messageDataError });
    } if (error.name === 'ValidationError') {
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
    res.send({ data: updatedAvatar });
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
  getUser,
  login,
};
