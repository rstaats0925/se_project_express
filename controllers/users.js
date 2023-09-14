const User = require('../models/user');
const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = require('../utils/errors');

function createUser (req, res) {
  console.log(req);
  console.log(req.body);

  const {name, avatar} = req.body;

  User.create({ name, avatar })
    .then(user => {
      console.log(user);
      res.send({data: user});
    })
    .catch(err => {
      res.status(500).send({message: "error from create user", err});
    })
}

function getUsers (req, res) {
  User.find({})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(500).send({message: "error from getUsers", err})
    })
}

function getUser(req, res) {
  User.findById(req.params.id)
    .orFail()
    .then(user => {
      res.status(OK).send(user);
    })
    .catch(err => {
      switch(err.name) {
        case "DocumentNotFoundError":
          res.status(NOT_FOUND).send({messsage: `user id ${req.params.id} couldn't be found`, err})
          break;
        case "CastError":
          res.status(BAD_REQUEST).send({message: "id is incorrect format", err})
          break;
        default:
          res.status(INTERNAL_SERVER_ERROR).send({message: "An error has occurred on the server", err})
          break;
      }
    })
}

module.exports = {
  createUser,
  getUsers,
  getUser
};
