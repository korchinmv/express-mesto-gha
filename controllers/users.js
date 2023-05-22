const userModel = require('../models/user');

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
    res.send(user);
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
    res.status(201).send(user);
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
};
