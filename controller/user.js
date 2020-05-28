const { User, validateUser } = require("../model/users");
const createError = require("../utilis/createError");

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
    const finduser = await User.findOne({ email: req.body.email });

    if (finduser) throw createError(409, "Email already exist");

    const newUser = await User.create(req.body);

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

    await deleteUser.remove();

    res.status(204).send({ status: "success", payload: {} });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const editUser = await User.findByIdAndUpdate(req.params.id, req.body);

    await editUser.save();

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
