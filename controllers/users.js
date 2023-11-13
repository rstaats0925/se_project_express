const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  OK,
  UnauthorizedError,
  CREATED,
  ConflictError,
  BadRequestError,
  NotFoundError,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");
const { handleUserHttpError } = require("../utils/errorHandlers");
const { JWT_SECRET } = require("../utils/config");

function login(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("incorrect username or password");
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(OK).send({ token });
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    // res.status(BAD_REQUEST).send({ message: "Please include an email" });
    const err = new BadRequestError("Please include an email");
    res.status(err.status).send(err);
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new ConflictError(
          "a user with that email already exists.",
        );
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
          .catch(next);
      });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch(next);
}

function updateProfile(req, res, next) {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(OK).send({ user });
    })
    .catch(next);
}
module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
