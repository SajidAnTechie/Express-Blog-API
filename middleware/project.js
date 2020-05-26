const createError = require("../utilis/createError");
const { Project } = require("../model/project");

const ProjectAccessBy = async (req, res, next) => {
  try {
    const findProject = await Project.findOne({
      _id: req.params.id,
      userId: req.token.id,
    });

    if (!(req.token.isAdmin || findProject))
      throw createError(401, "Unauthorize Access or Project not found");

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = ProjectAccessBy;
