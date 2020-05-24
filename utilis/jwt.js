const jwt = require("jsonwebtoken");
const createError = require("./createError");

const createToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};

const verifyToken = (payload, secretKey) => {
  try {
    const decodedToken = jwt.verify(payload, secretKey);

    return decodedToken;
  } catch (error) {
    if (error.name === "TokenExpiredError")
      throw createError(401, "Token is Expired");
    // throw error;
  }
};

module.exports = { createToken, verifyToken };
