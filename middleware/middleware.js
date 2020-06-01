const unknownEndpoints = () => {
  const error = new Error("Unknown Endpoints");
  error.status = 404;
  throw error;
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  res
    .status(error.status || 500)
    .send({ status: "Error", error: error.message });
};
module.exports = {
  unknownEndpoints,
  errorHandler,
};
