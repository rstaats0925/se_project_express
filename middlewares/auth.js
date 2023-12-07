const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../utils/config");
const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "Javascript2023";
const { UNAUTHORIZED } = require("../utils/errors");

function authorize(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log(req.headers);
    res
      .status(UNAUTHORIZED)
      .send({ message: "Authorization required at startswithBearer" });
    return;
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
    return;
  }

  req.user = payload;
  next();
}

module.exports = {
  authorize,
};
