const { User } = require("../model/users");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilis/jwt");
const createError = require("../utilis/createError");

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw createError(401, "Email or Password doesn't match");

    const comparePassword = await bcrypt.compare(
      req.body.passwordHash,
      user.passwordHash
    );
    console.log(comparePassword);

    if (!comparePassword)
      throw createError(401, "Email or Password doesn't match");

    const userToken = {
      username: user.username,
      id: user._id,
      isAdmin: user.isAdmin,
    };

    const token = createToken(userToken, process.env.SECRET_KEY);

    res.status(200).send({
      token,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      expireIn: "3600",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
