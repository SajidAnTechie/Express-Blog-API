const unknownEndpoints = () => {
  const error = new Error("Unknown Endpoints");
  error.status = 404;
  throw error;
};

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(404).send({
      status: "Error",
      error: `Project not found with id of ${error.value}`,
    });
  }
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    return res.status(400).send({ status: "Error", error: message });
  }

  res
    .status(error.status || 500)
    .send({ status: "Error", error: error.message });
};
module.exports = {
  unknownEndpoints,
  errorHandler,
};
