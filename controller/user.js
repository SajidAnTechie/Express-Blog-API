const { User } = require("../model/users");
const createError = require("../utilis/createError");
const sendMail = require("../controller/mail");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({ status: "success", payload: users });
  } catch (error) {
    next(error);
  }
};
const createUsers = async (req, res, next) => {
  try {
    // const finduser = await User.findOne({ email: req.body.email });

    // if (!finduser) throw createError(409, "Email already exist");

    const newUser = await User.create(req.body);

    const sendMailToUser = await sendMail(this);

    if (sendMailToUser === "success")
      res.status(201).send({ status: "success", payload: newUser });
  } catch (error) {
    next(error);
  }
};

const getuserById = async (req, res, next) => {
  try {
    const getuser = await User.findById(req.params.id);

    if (!getuser) throw createError(404, "User not found");

    res.status(200).send({ status: "success", payload: getuser });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findById(req.params.id);

    if (!deleteUser) throw createError(404, "No such user is found");

    await deleteUser.remove();

    res.status(204).send({ status: "success", payload: {} });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const SALT_WORK_FACTOR = 10;
    const passwordHash = await bcrypt.hash(
      req.body.passwordHash,
      SALT_WORK_FACTOR
    );

    const editUser = {
      username: req.body.username,
      email: req.body.email,
      passwordHash: passwordHash,
    };

    await User.findOneAndUpdate({ _id: req.params.id }, editUser);

    const updateUser = await User.findById(req.params.id);

    res.status(200).send({ status: "success", payload: updateUser });
  } catch (error) {
    next(error);
  }
};

const makeUserAdmin = async (req, res, next) => {
  try {
    const editUser = await User.findById(req.params.id);

    if (!editUser) throw createError(404, "No such user is found");

    editUser.isAdmin = !editUser.isAdmin;

    await editUser.save();

    const getUser = await User.findById(req.params.id);

    res.status(200).send({ status: "success", payload: getUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUsers,
  deleteUser,
  updateUser,
  getuserById,
  makeUserAdmin,
};
