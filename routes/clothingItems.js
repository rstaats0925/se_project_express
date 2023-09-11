const router = require('express').Router();
const clothingItem = require('../models/clothingItem');

router.get('/items', (req, res) => {
  clothingItem.find({})
    .then(item => {
      res.send({data: item});
    })
    .catch(() => {
      res.status(404).send({message: "item not found"});
    })
});

router.post('/items', (req, res) => {
  const {name, weather, imageUrl} = req.body;
  clothingItem.create({name, weather, imageUrl});
});

router.delete('/items', (req, res) => {
  clothingItem.findByIdAndRemove(req.params.id)
    .then(user => {res.send({data: user})})
    .catch(() => { res.status(500).send({message: "Error"}) })
});
