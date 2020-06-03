const mongoose = require("mongoose");
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
    completed: {
      type: Boolean,
      default: false,
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
    title: Joi.string().min(3).max(50).empty().required().messages({
      "string.base": "username should be a type of 'text",
      "string.min": "username should have a minimum length of {3}",
      "string.max": "username should have a maximum length of {50}",
      "string.empty": "username cannot be an empty feild",
      "any.required": "username is a required field",
    }),
    description: Joi.string().min(10).empty().max(255).required().messages({
      "string.base": "username should be a type of 'text",
      "string.min": "username should have a minimum length of {10}",
      "string.max": "username should have a maximum length of {255}",
      "string.empty": "username cannot be an empty feild",
      "any.required": "username is a required field",
    }),
  });

  return schema.validate(project);
}

const Project = mongoose.model("Project", ProjectSchema);

module.exports = {
  validateProject,
  Project,
};
