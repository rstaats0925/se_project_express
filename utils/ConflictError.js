module.exports.ConflictError = class extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = "Conflict Error";
  }
};
