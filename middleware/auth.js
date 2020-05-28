const createError = require("../utilis/createError");
const { verifyToken } = require("../utilis/jwt");

const auth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!(authorization && authorization.toLowerCase().startsWith("bearer")))
    throw createError(401, "Invalid token or token not found");

  const token = authorization.substring(7);

  const decodedToken = verifyToken(token, process.env.SECRET_KEY);

  req.token = decodedToken;
  next();
};

module.exports = auth;
