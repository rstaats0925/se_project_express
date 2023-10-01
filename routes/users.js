const express = require('express');

const router = express.Router();
const { getUsers, getCurrentUser, updateProfile } = require('../controllers/users');
const { authorize } = require('../middlewares/auth');

router.get('/me', getCurrentUser);
router.patch('/me', updateProfile);

module.exports = router;
