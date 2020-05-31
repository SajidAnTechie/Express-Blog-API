const createError = require("../utilis/createError");

const isAuthAdmin = (req, res, next) => {
  if (!req.token.isAdmin) throw createError(401, "Operation is not allowed");

  next();
};

const UpdateUserAccessBy = (req, res, next) => {
  if (req.token.id !== req.params.id)
    throw createError(401, "Operation not allowed");

  next();
};

const deleteUserAccessBy = (req, res, next) => {
  // if (!req.token.isAdmin || !(req.token.id !== req.params.id))
  //   throw createError(401, "Unauthorize Access or user not found");

  if (!(req.token.isAdmin || req.token.id === req.params.id))
    throw createError(401, "Unauthorize Access or user not found");

  next();
};

module.exports = { isAuthAdmin, UpdateUserAccessBy, deleteUserAccessBy };
