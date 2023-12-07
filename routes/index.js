const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const { NotFoundError } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");
const { authorize } = require("../middlewares/auth");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation.js");

router.use("/users", authorize, user);
router.use("/items", clothingItem);

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);
router.use((req, res) => {
  // res.status(NOT_FOUND).send({ message: "router not found" });
  throw new NotFoundError("Router not found");
});

module.exports = router;
