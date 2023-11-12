// const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
// const FORBIDDEN = 403;
// const NOT_FOUND = 404;
// const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;
const OK = 200;
const CREATED = 201;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = "Bad Request Error";
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.name = "Unauthorized Error";
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = "Forbidden Error";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = "Not Found Error";
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = "Conflict Error";
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  INTERNAL_SERVER_ERROR,
  OK,
  CREATED,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
};
