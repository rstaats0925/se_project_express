const express = require('express');

const router = express.Router();
const { createUser, getUsers, getUser } = require('../controllers/users');

module.exports = router;
