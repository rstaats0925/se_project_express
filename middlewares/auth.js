const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../utils/config');

function authorize (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("bearer ")) {
    res.status(401).send({message: "Authorization required"});
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  }

  catch (err) {
    return res.status(401).send({message: "Authorization required"});
  }

  req.user = payload;
  next();
}

module.exports = {
  authorize
}
