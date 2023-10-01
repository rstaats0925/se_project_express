const express = require('express');

const router = express.Router();
const { createUser, getUsers, getUser, getCurrentUser } = require('../controllers/users');
const { authorize } = require('../middlewares/auth');

router.get('/me', getCurrentUser);

module.exports = router;
