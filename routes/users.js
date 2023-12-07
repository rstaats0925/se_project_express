const express = require("express");

const router = express.Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validatePatch } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validatePatch, updateProfile);

module.exports = router;
