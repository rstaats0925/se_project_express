const User = require('../models/user');

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

module.exports = createUser;
