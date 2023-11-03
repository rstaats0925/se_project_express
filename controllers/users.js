const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  OK,
  UNAUTHORIZED,
  CREATED,
  CONFLICT,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");
const { handleUserHttpError } = require("../utils/errorHandlers");
const { JWT_SECRET } = require("../utils/config");

function login(req, res) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("incorrect username or password"));
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(OK).send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
}

function createUser(req, res) {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    res.status(BAD_REQUEST).send({ message: "Please include an email" });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error("a user with that email already exists.");
        error.statusCode = CONFLICT;
        return Promise.reject(error);
      }

      return bcrypt.hash(password, 10).then((hash) => {
        User.create({ name, avatar, email, password: hash })
          .then((newUser) => {
            res.status(CREATED).send({
              name: newUser.name,
              email: newUser.email,
              avatar: newUser.avatar,
            });
          })
          .catch((err) => {
            handleUserHttpError(req, res, err);
          });
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .send({ message: err.message || "Internal server error" });
    });
}

function getCurrentUser(req, res) {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      handleUserHttpError(req, res, err);
    });
}

function updateProfile(req, res) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(OK).send({ user });
    })
    .catch((err) => {
      handleUserHttpError(req, res, err);
    });
}
module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
