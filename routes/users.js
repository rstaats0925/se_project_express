const express = require('express');

const router = express.Router();
const { createUser, getUsers, getUser } = require('../controllers/users');

router.get('/me', /*getCurrentUser*/);

module.exports = router;
