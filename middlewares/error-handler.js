function handleErrors(err, req, res, next) {
  console.error(err);
  const { status = 500, message, name } = err;
  res.status(status).send({
    message: status === 500 ? "an error has occured on the server" : message,
    name,
  });
}

module.exports = handleErrors;
