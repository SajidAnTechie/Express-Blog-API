const createProject = async (req, res, next) => {
  try {
    res.send({ token: req.token });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createProject,
};
