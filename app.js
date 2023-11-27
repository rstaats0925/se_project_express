const express = require("express");
const cors = require("cors");
const handleErrors = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/loggers");

const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to db", r);
  },
  (e) => console.log("db error", e),
);

const routes = require("./routes/index");

app.use(express.json());

app.use(cors());
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
