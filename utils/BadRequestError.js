module.exports.BadRequestError = class extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = "Bad Request Error";
  }
};
