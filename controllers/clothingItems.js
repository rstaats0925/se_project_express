const ClothingItem = require('../models/clothingItem');
const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, CREATED } = require('../utils/errors');
const { handleItemHttpError } = require('../utils/errorHandlers');

function getItems (req, res) {
  ClothingItem.find({})
    .then(items => {
      res.status(OK).send(items)
    })
    .catch(err => {
      res.status(INTERNAL_SERVER_ERROR).send({message: "error in getItems", err})
    })
}

function createItem (req, res) {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id

  ClothingItem.create({ name, weather, imageUrl, owner})
    .then(item => {
      res.status(CREATED).send({data:item});
    })
    .catch(err => {res.status(INTERNAL_SERVER_ERROR).send({message: "error in createItem", err})})
}

function deleteItem (req, res) {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .orFail()
    .then(item => {
      res.status(OK).send(item);
    })
    .catch(err => {
      handleItemHttpError(req, res, err);
    })
}

function likeItem (req, res) {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail()
    .then(like => {
      res.status(OK).send(like);
    })
    .catch(err => {
      handleItemHttpError(req, res, err);
    })
}

function dislikeItem (req, res) {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail()
    .then(dislike => {
      res.status(200).send(dislike);
    })
    .catch(err => {
      handleItemHttpError(req, res, err);
    })
}

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem
}
