const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Project } = require("../model/project");
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
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
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

UserSchema.pre("remove", async function (next) {
  await Project.deleteOne({ userId: this._id }).exec();
  next();
});

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().empty().min(3).max(50).required().messages({
      "string.base": `username should be a type of 'text'`,
      "string.min": `username should have a minimum length of {3}`,
      "string.max": `username should have a maximum length of {50}`,
      "string.empty": `username cannot be an empty feild`,
      "any.required": `username is a required field`,
    }),
    email: Joi.string()
      .required()
      .empty()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .messages({
        "any.required": `Email is a required field `,
        "string.empty": `Email cannot be an empty feild`,
      }),
    passwordHash: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .message(
        "Password sholud be at lest one digit, one lower and upper case ,one spcial charcter like @%!&^*, and must be 8 character long"
      ),

    // for password confirmation

    //Joi.ref('passwordHash')
  });

  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  validateUser,
};
