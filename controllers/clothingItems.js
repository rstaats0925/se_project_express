const ClothingItem = require("../models/clothingItem");
const { NotFoundError } = require("../utils/NotFoundError");
const { ForbiddenError } = require("../utils/ForbiddenError");
const { BadRequestError } = require("../utils/BadRequestError");
const { OK, CREATED } = require("../utils/errors");

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
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
}

function deleteItem(req, res, next) {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => new NotFoundError("Not found error"))
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.deleteOne().then(() => res.send({ item }));
      }

      throw new ForbiddenError("Can only delete own items");
    })
    .catch(next);
}

function likeItem(req, res, next) {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError("Not found error"))
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
    .orFail(() => new NotFoundError("Not found error"))
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
