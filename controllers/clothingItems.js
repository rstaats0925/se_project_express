const ClothingItem = require("../models/clothingItem");
const { OK, CREATED, FORBIDDEN } = require("../utils/errors");
const { handleItemHttpError } = require("../utils/errorHandlers");

function getItems(req, res, next) {
  ClothingItem.find({})
    .then((items) => {
      res.status(OK).send(items);
    })
    .catch(next);
}

function createItem(req, res, next) {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED).send({ data: item });
    })
    .catch(next);
}

function deleteItem(req, res, next) {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne().then(() => res.send({ item }));
      }

      const error = new Error();
      error.status = FORBIDDEN;
      error.name = "Forbidden";
      error.message = "Can only delete own cards";
      throw error;
    })
    .catch(next);
}

function likeItem(req, res, next) {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => {
      res.status(OK).send(like);
    })
    .catch(next);
}

function dislikeItem(req, res, next) {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((dislike) => {
      res.status(OK).send(dislike);
    })
    .catch(next);
}

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
