const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const {
  // eslint-disable-next-line max-len
  messageNotUser, messageEmail, messageDataError, messageErrorEmailOrPassword, CREATED,
} = require('../utils/responses');
const { generateToken } = require('../utils/jwtAuth');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizationError = require('../errors/UnauthorizationError');

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(messageNotUser);
    }
    res.send({ data: user });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new ValidationError(messageDataError));
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError(messageNotUser);
    }
    res.send({ data: user });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new ValidationError(messageDataError));
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const createUser = async (req, res, next) => {
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
    const updUser = user.toObject();
    delete updUser.password;
    res.status(CREATED).send({ data: updUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ValidationError(messageDataError));
    } if (error.code === 11000) {
      return next(new ConflictError(messageEmail));
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select('+password').orFail(new Error('UnauthorizedError'));
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(new UnauthorizationError(messageErrorEmailOrPassword));
    }
    const token = generateToken({ _id: user._id }, '7d');
    res.send({ token });
  } catch (error) {
    if (error.message === 'UnauthorizedError') return next(new UnauthorizationError(messageErrorEmailOrPassword));
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const updateUser = async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).orFail(new Error('NotValidData'));
    res.send({ data: updatedUser });
  } catch (error) {
    if (error.message === 'NotValidData') {
      return next(new NotFoundError(messageDataError));
    } if (error.name === 'ValidationError') {
      return next(new ValidationError(messageDataError));
    }
    next(error);
  }
};

// eslint-disable-next-line consistent-return
const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    // eslint-disable-next-line max-len
    const updatedAvatar = await userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true });
    res.send({ data: updatedAvatar });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ValidationError(messageDataError));
    }
    next(error);
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
