const User = require('../models/user');
const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = require('../utils/errors');
const { handleUserHttpError } = require('../utils/errorHandlers');


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
      handleUserHttpError(req, res, err);
    })
}

module.exports = {
  createUser,
  getUsers,
  getUser
};
