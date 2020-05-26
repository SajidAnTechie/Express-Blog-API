const router = require("express").Router();

const {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  approveProject,
  rejectProject,
  updateProject,
} = require("../controller/project");
const { validateProjectSchema } = require("../middleware/validation");
const auth = require("../middleware/auth");
const ProjectAccessBy = require("../middleware/project");

router.all("*", auth);

router.get("/", getAllProjects);
router.post("/post", validateProjectSchema, createProject);
router.get("/:id", ProjectAccessBy, getProjectById);
router.put(
  "/update/:id",
  validateProjectSchema,
  ProjectAccessBy,
  updateProject
);
router.delete("/delete/:id", ProjectAccessBy, deleteProject);
router.put("/approveProject/:id", approveProject);
router.put("/rejectProject/:id", rejectProject);

module.exports = router;
