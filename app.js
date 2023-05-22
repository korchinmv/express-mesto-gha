const express = require('express');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const router = require('./routes/routers');

const { PORT = 3000 } = process.env;

mongoose.connect(DB_URL);

const app = express();

app.use(express.json());
app.use(router);

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('646bc93036a6d4be3a6c55d3'),
  };
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
