const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/UnauthorizedError");

const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "Javascript2023";

function authorize(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log(req.headers);

    throw new UnauthorizedError("Authorization required");
    // return;
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError("Unauthorized error"));
    return;
  }

  req.user = payload;
  next();
}

module.exports = {
  authorize,
};
