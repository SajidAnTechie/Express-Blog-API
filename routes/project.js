const router = require("express").Router();

const { createProject } = require("../controller/project");
const auth = require("../middleware/auth");

router.post("/post", auth, createProject);
module.exports = router;
