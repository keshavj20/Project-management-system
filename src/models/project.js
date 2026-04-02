const mongoose = require("mongoose");

const projectschema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USer",
    },
    title: { type: String, required: true },
    description: String,
    start_date: { type: Date, required: true },
    end_date: { type: Date, requied: true },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "On Hold", "Completed"],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectschema);
