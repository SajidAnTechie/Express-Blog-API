const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const SALT_WORK_FACTOR = 10;
  if (this.isModified("passwordHash")) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, SALT_WORK_FACTOR);
  }
  next();
});

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    passwordHash: Joi.string().pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    ),
    isAdmin: Joi.boolean().default(false),
  });

  return schema.validate(user);

  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,255}$/
  //     /^
  //   (?=.*\d)          // should contain at least one digit
  //   (?=.*[a-z])       // should contain at least one lower case
  //   (?=.*[A-Z])       // should contain at least one upper case
  //   [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
  // $/
}

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  validateUser,
};
