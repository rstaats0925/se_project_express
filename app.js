const express = require('express');
const { PORT = 3001 } = process.env;
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})
