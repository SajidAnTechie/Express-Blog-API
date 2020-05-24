const router = require("express").Router();

const {
  createUsers,
  getUsers,
  deleteUser,
  updateUser,
  getuserById,
} = require("../controller/user");
const validateUserSchema = require("../middleware/validation");

router.get("/", getUsers);
router.post("/post", validateUserSchema, createUsers);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", validateUserSchema, updateUser);
router.get("/:id", getuserById);

module.exports = router;
