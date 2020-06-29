const router = require("express").Router();

const {
  createUsers,
  getUsers,
  deleteUser,
  updateUser,
  getuserById,
  makeUserAdmin,
  updatePassword,
} = require("../controller/user");

const { validateUserSchema } = require("../middleware/validation");

const auth = require("../middleware/auth");

const {
  isAuthAdmin,
  UpdateUserAccessBy,
  deleteUserAccessBy,
} = require("../middleware/user");

router.get("/", getUsers);
router.post("/post", validateUserSchema, createUsers);
router.delete("/delete/:id", auth, deleteUserAccessBy, deleteUser);
router.put("/update/:id", auth, UpdateUserAccessBy, updateUser);
router.put("/updatepassword", auth, updatePassword);
router.put("/allowAdmin/:id", auth, isAuthAdmin, makeUserAdmin);
router.get("/:id", getuserById);

module.exports = router;
