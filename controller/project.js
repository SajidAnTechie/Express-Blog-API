const { Project } = require("../model/project");
const { User } = require("../model/users");
const createError = require("../utilis/createError");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const getAllProjects = async (req, res, next) => {
  try {
    const Allprojects = await Project.find().populate("userId", {
      username: 1,
      email: 1,
    });

    res.status(200).send({ status: "success", payload: Allprojects });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const getProjectById = await Project.findById(req.params.id).populate(
      "userId",
      {
        username: 1,
        email: 1,
      }
    );
    if (!getProjectById) throw createError(404, "No such project is found");

    res.status(200).send({ status: "success", payload: getProjectById });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    if (req.file === undefined)
      throw createError(400, "Jpeg or Png file is supported");

    const user = await User.findById(req.token.id);

    if (!user) throw createError(404, "No such user is found");

    const newProject = await Project.create({
      ...req.body,
      projectImage: `uploads/${req.file.filename}`,
      userId: user.id,
    });

    user.projects = user.projects.concat(newProject._id);

    await user.save();

    res.status(201).send({ status: "success", payload: newProject });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const ProjectOwner = await Project.findByIdAndDelete(req.params.id);
    if (!ProjectOwner) throw createError(404, "No such project is found");

    const user = await User.findById(ProjectOwner.userId);

    const filterUserProject = user.projects.filter((projectId) => {
      return !req.params.id.includes(projectId);
    });

    user.projects = filterUserProject;

    await user.save();

    res.status(204).send({ status: "success", payload: {} });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    if (req.file)
      await Project.findByIdAndUpdate(req.params.id, {
        ...req.body,
        projectImage: `uploads/${req.file.filename}`,
      });

    await Project.findByIdAndUpdate(req.params.id, req.body);

    const updateProject = await Project.findById(req.params.id);

    res.status(200).send({ status: "success", payload: updateProject });
  } catch (error) {
    next(error);
  }
};
const completeProject = async (req, res, next) => {
  try {
    const editProject = await Project.findById(req.params.id);

    editProject.completed = !editProject.completed;

    await editProject.save();

    const completeProject = await Project.findById(req.params.id);

    res.status(200).send({ status: "success", payload: completeProject });
  } catch (error) {
    next(error);
  }
};

const approveProject = async (req, res, next) => {
  try {
    if (!req.token.isAdmin)
      throw createError(401, "Unauthorize Access or Project not found");

    const approveProjectById = await Project.findByIdAndUpdate(req.params.id, {
      verified: true,
    });

    if (!approveProjectById) throw createError(404, "No such project found");

    const approveProject = await Project.findById(req.params.id);

    res.status(200).send({ status: "success", payload: approveProject });
  } catch (error) {
    next(error);
  }
};

const rejectProject = async (req, res, next) => {
  try {
    if (!req.token.isAdmin)
      throw createError(401, "Unauthorize Access or Project not found");

    const rejectProjectById = await Project.findByIdAndUpdate(req.params.id, {
      verified: false,
    });

    if (!rejectProjectById) throw createError(404, "No such project found");

    const rejectProject = await Project.findById(req.params.id);

    res.status(200).send({ status: "success", payload: rejectProject });
  } catch (error) {
    next(error);
  }
};

const authProject = async (req, res, next) => {
  try {
    const authProject = await Project.find({ userId: req.token.id }).populate(
      "userId",
      {
        username: 1,
        email: 1,
      }
    );

    res.status(200).send({ status: "success", payload: authProject });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
  completeProject,
  approveProject,
  rejectProject,
  authProject,
};
