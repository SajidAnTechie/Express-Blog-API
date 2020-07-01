const { User } = require("../model/users");
const createError = require("../utilis/createError");
const sendMail = require("../utilis/mail");
const bcrypt = require("bcrypt");
const user = require("../middleware/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("projects", {
      title: 1,
    });
    res
      .status(200)
      .send({ status: "success", count: users.length, payload: users });
  } catch (error) {
    next(error);
  }
};
const createUsers = async (req, res, next) => {
  try {
    const finduser = await User.findOne({ email: req.body.email });

    if (finduser) throw createError(409, "Email already exist");
    const newUser = await User.create(req.body);

    try {
      const options = {
        name: newUser.username,
        email: newUser.email,
      };
      await sendMail(options);

      res.status(201).send({ status: "success", payload: newUser });
    } catch (error) {
      await newUser.remove();
      throw createError(500, "Please try again");
    }
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
    const updateDetails = {
      username: req.body.username,
      email: req.body.email,
    };

    await User.findByIdAndUpdate(req.params.id, updateDetails, {
      new: true,
      runValidators: true,
    });

    const updateUser = await User.findById(req.params.id);

    res.status(200).send({ status: "success", payload: updateUser });
  } catch (error) {
    next(error);
  }
};

//Update Password controllers

const updatePassword = async (req, res, next) => {
  try {
    console.log("object");
    const user = await User.findById(req.token.id);

    //compare current password
    const isMatch = await bcrypt.compare(
      req.body.currentPasswordHash,
      user.passwordHash
    );
    if (!isMatch)
      throw createError(
        400,
        `Current Password ${req.body.currentPasswordHash} doesn't match`
      );

    user.passwordHash = req.body.newPasswordHash;

    await user.save();

    res.status(200).send({ status: "success", payload: user });
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
  updatePassword,
};
