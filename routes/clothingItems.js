const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { authorize } = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/", getItems);

router.post("/", validateCardBody, authorize, createItem);

router.delete("/:itemId", validateId, authorize, deleteItem);
router.delete("/:itemId/likes", validateId, authorize, dislikeItem);

router.put("/:itemId/likes", validateId, authorize, likeItem);

module.exports = router;
