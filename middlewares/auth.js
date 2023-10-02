const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/config');

function authorize (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log(req.headers);
    res.status(401).send({message: "Authorization required at startswithBearer"});
    return;
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  }

  catch (err) {
    console.error(err);
    return res.status(401).send({message: "Authorization required"});
  }

  req.user = payload;
  next();
}

module.exports = {
  authorize
}
