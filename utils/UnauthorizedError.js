module.exports.UnauthorizedError = class extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.name = "Unauthorized Error";
  }
};
