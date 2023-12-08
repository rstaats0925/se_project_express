const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { NotFoundError } = require("../utils/NotFoundError");
const { BadRequestError } = require("../utils/BadRequestError");
const { ConflictError } = require("../utils/ConflictError");
const { OK, CREATED } = require("../utils/errors");
// const { JWT_SECRET } = require("../utils/config");

const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "Javascript2023";

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
          .catch((err) => {
            if (err.name === "ValidationError") {
              next(new BadRequestError("invalid data"));
            } else {
              next(err);
            }
          });
      });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("Not found error"))
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
    .orFail(() => new NotFoundError("Not found error"))
    .then((user) => {
      res.status(OK).send({ user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
}
module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
