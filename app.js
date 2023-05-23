const express = require('express');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const router = require('./routes/routers');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '646d1ebe969627b3d5363e47',
  };

  next();
});
app.use(router);

async function startApp() {
  try {
    mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on ${PORT} port`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

startApp();
