const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('123');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
