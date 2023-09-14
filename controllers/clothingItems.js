const ClothingItem = require('../models/clothingItem');

function getItems (req, res) {
  ClothingItem.find({})
    .then(items => {
      res.status(200).send(items)
    })
    .catch(err => {
      res.status(500).send({message: "error in getItems", err})
    })
}

function createItem (req, res) {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id

  ClothingItem.create({ name, weather, imageUrl, owner})
    .then(item => {
      res.status(201).send({data:item});
    })
    .catch(err => {res.status(500).send({message: "error in createItem", err})})
}

function deleteItem (req, res) {
  ClothingItem.findByIdAndRemove(req.params.id)
    .orFail()
    .then(item => {
      res.status(200).send(item);
    })
    .catch(err => {
      switch(err.name) {
        case "DocumentNotFoundError":
          res.status(404).send({messsage: `user id ${req.params.id} couldn't be found`, err})
          break;
        case "CastError":
          res.status(400).send({message: "id is incorrect format", err})
          break;
        default:
          res.status(500).send({message: "An error has occurred on the server", err})
          break;
      }
    })
}

module.exports = {
  getItems,
  createItem,
  deleteItem
}
