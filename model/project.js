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
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is requred"],
      minlength: 10,
      maxlength: 255,
      trim: true,
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
    projectImage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

function validateProject(project) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).empty().required().messages({
      "string.base": "title should be a type of 'text",
      "string.min": "title should have a minimum length of {3}",
      "string.max": "title should have a maximum length of {50}",
      "string.empty": "title cannot be an empty feild",
      "any.required": "title is a required field",
    }),
    description: Joi.string().min(10).empty().max(255).required().messages({
      "string.base": "description should be a type of 'text",
      "string.min": "description should have a minimum length of {10}",
      "string.max": "description should have a maximum length of {255}",
      "string.empty": "description cannot be an empty feild",
      "any.required": "description is a required field",
    }),
    projectImage: Joi.string(),
  });

  return schema.validate(project);
}

const Project = mongoose.model("Project", ProjectSchema);

module.exports = {
  validateProject,
  Project,
};
