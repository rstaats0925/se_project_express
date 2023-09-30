const router = require('express').Router();
const user = require('./users');
const clothingItem = require('./clothingItems')
const { NOT_FOUND } = require('../utils/errors');
const { login, createUser } = require('../controllers/users');
const { authorize } = require('../middlewares/auth');

router.use('/users', authorize, user);
router.use('/items', clothingItem);

router.post('/signin', login);
router.post('/signup', createUser);
router.use((req, res) => {
  res.status(NOT_FOUND).send({message: "router not found"});
})

module.exports = router;
