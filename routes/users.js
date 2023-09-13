const express = require('express');
const router = express.Router();
const createUser = require('../controllers/createUser');
// const User = require('../models/user');

// router.get('/users', (req, res) => {
//   User.find({})
//     .then(data => {
//       res.send(data);
//     })
//     .catch(() => {
//       res.status(404).send({message: "users not found"});
//     })
// })

router.get('/', (req, res) => {
  res.send("Received a GET request at /users");
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.send(`recieved a GET request for user id: ${id}`);
})

// router.get('/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then(user => {
//       res.send({data: user});
//     })
//     .catch(() => {
//       res.status(404).send({message: "user not found"});
//     })
// })

router.post('/', (req, res) => {
  createUser(req, res);
})

module.exports = router;
