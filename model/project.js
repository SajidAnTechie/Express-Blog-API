const mongoose = require("mongoose");
const { User } = require("../model/users");
const Joi = require("@hapi/joi");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "description is requred"],
      minlength: 10,
      maxlength: 255,
    },
    verified: {
      type: Boolean,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

function validateProject(project) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(255).required(),
  });

  return schema.validate(project);
}

const Project = mongoose.model("Project", ProjectSchema);

module.exports = {
  validateProject,
  Project,
};
