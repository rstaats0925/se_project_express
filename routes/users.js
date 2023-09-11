const router = require('express').Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send({message: "users not found"});
    })
})

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.send({data: user});
    })
    .catch(() => {
      res.status(404).send({message: "user not found"});
    })
})

router.post('/users', (req, res) => {
  const { name, avatar } = req.body;
  User.create({name, avatar});
})
