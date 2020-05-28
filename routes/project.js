const router = require("express").Router();

const {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  approveProject,
  rejectProject,
  updateProject,
  completeProject,
} = require("../controller/project");
const { validateProjectSchema } = require("../middleware/validation");
const auth = require("../middleware/auth");

const {
  ProjectAccessBy,
  completeProjectAccessBy,
  updateProjectAccessBy,
} = require("../middleware/project");

router.all("*", auth);

router.get("/", getAllProjects);
router.post("/post", validateProjectSchema, createProject);
router.get("/:id", ProjectAccessBy, getProjectById);
router.put(
  "/update/:id",
  validateProjectSchema,
  updateProjectAccessBy,
  updateProject
);
router.delete("/delete/:id", ProjectAccessBy, deleteProject);
router.put("/approveProject/:id", approveProject);
router.put("/rejectProject/:id", rejectProject);
router.put("/completeProject/:id", completeProjectAccessBy, completeProject);

module.exports = router;
