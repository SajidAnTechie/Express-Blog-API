const router = require("express").Router();

const {
  createUsers,
  getUsers,
  deleteUser,
  updateUser,
  getuserById,
  makeUserAdmin,
} = require("../controller/user");

const { validateUserSchema } = require("../middleware/validation");

const auth = require("../middleware/auth");

const {
  isAuthAdmin,
  UpdateUserAccessBy,
  deleteUserAccessBy,
} = require("../middleware/user");

router.get("/", getUsers);
router.post("/post", createUsers);
router.delete("/delete/:id", auth, deleteUserAccessBy, deleteUser);
router.put(
  "/update/:id",
  auth,
  validateUserSchema,
  UpdateUserAccessBy,
  updateUser
);
router.put("/allowAdmin/:id", auth, isAuthAdmin, makeUserAdmin);
router.get("/:id", getuserById);

module.exports = router;
