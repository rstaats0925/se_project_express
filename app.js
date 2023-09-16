const express = require('express');

const { PORT = 3001 } = process.env;
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', (r) => {
  console.log("connected to db", r)}, e => console.log("db error", e)
);

const routes = require('./routes/index');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '650246c6173eca7186f65581'// paste the _id of the test user created in the previous step
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
