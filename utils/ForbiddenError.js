module.exports.ForbiddenError = class extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = "Forbidden Error";
  }
};
