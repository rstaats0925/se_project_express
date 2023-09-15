const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, CREATED } = require('../utils/errors');

function handleUserHttpError (req, res, err) {
  console.log(res);
  switch(err.name) {
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({messsage: `user id ${req.params.id} couldn't be found`, err})
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({message: "id is incorrect format", err})
      break;
    default:
      res.status(INTERNAL_SERVER_ERROR).send({message: "An error has occurred on the server", err})
      break;
  }
}

function handleItemHttpError (req, res, err) {
  console.log(res);
  switch(err.name) {
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({messsage: `item id ${req.params.itemId} couldn't be found`, err})
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({message: "id is incorrect format", err})
      break;
    default:
      res.status(INTERNAL_SERVER_ERROR).send({message: "An error has occurred on the server", err})
      break;
  }
}
module.exports = {
  handleUserHttpError,
  handleItemHttpError
}
