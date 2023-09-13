const express = require('express');
const router = express.Router();
const createUser = require('../controllers/createUser');

router.get('/', (req, res) => {
  res.send("Received a GET request at /users");
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.send(`recieved a GET request for user id: ${id}`);
})

router.post('/', (req, res) => {
  createUser(req, res);
})

module.exports = router;
