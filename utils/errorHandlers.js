const { BadRequestError } = require("./BadRequestError");
const { ForbiddenError } = require("./ForbiddenError");
const { NotFoundError } = require("./NotFoundError");
const { UnauthorizedError } = require("./UnauthorizedError");
const { INTERNAL_SERVER_ERROR } = require("./errors");

function handleUserHttpError(req, res, err) {
  console.error(err);
  switch (err.name) {
    case "DocumentNotFoundError":
      // res.status(404).send({ message: "User id couldn't be found" });
      throw new NotFoundError("User id couldn't be found");
    // break;
    case "CastError":
      // res.status(400).send({ message: "Invalid data" });
      throw new BadRequestError("Invalid data");
    // break;
    case "ValidationError":
      // res.status(400).send({ message: "Invalid data" });
      throw new BadRequestError("Invalid data");
    // break;
    default:
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
      break;
  }
}

function handleItemHttpError(req, res, err) {
  console.error(err);
  switch (err.name) {
    case "DocumentNotFoundError":
      // res
      //   .status(404)
      //   .send({ message: `item id ${req.params.itemId} couldn't be found` });
      throw new NotFoundError(`${req.params.itemId} couldn't be found`);
    // break;
    case "CastError":
      // res.status(400).send({ message: "id is incorrect format" });
      throw new BadRequestError("Id is incorrect format");
    // break;
    case "ValidationError":
      // res
      //   .status(BAD_REQUEST)
      //   .send({ message: "id is incorrect format, or information is missing" });
      throw new BadRequestError(
        "id is incorrect format or information is missing",
      );
    // break;
    case "Unauthorized":
      // res.status(UNAUTHORIZED).send({ message: err.message });
      throw new UnauthorizedError(`${err.message}`);
    // break;
    case "Forbidden":
      // res.status(FORBIDDEN).send({ message: err.message });
      throw new ForbiddenError(`${err.message}`);
    // break;
    default:
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
      break;
  }
}
module.exports = {
  handleUserHttpError,
  handleItemHttpError,
};
