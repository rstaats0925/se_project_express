const User = require('../models/user');

function createUser (req, res) {
  const {name, avatar} = req.body;

  User.create({ name, avatar })
    .then(user => {
      res.status(201).send({data: user});
    })
    .catch(err => {
      res.status(500).send({message: "error"});
    })
}

module.exports = createUser;
