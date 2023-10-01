const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("./errors");

function handleUserHttpError (req, res, err) {
  console.error(err);
  switch(err.name) {
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({message: err.message});
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({message: err.message});
      break;
    case "ValidationError":
      res.status(BAD_REQUEST).send({message: err.message});
      break;
    default:
      res.status(INTERNAL_SERVER_ERROR).send({message: err.message});
      break;
  }
}

function handleItemHttpError (req, res, err) {
  console.error(err);
  switch(err.name) {
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({message: `item id ${req.params.itemId} couldn't be found`});
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({message: "id is incorrect format"});
      break;
    case "ValidationError":
      res.status(BAD_REQUEST).send({message: "id is incorrect format, or information is missing"});
      break;
    default:
      res.status(INTERNAL_SERVER_ERROR).send({message: "An error has occurred on the server"});
      break;
  }
}
module.exports = {
  handleUserHttpError,
  handleItemHttpError
}
