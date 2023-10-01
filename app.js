const express = require('express');
const cors = require("cors");

const { PORT = 3001 } = process.env;
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', (r) => {
  console.log("connected to db", r)}, e => console.log("db error", e)
);

const routes = require('./routes/index');

app.use(express.json());

app.use(routes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
