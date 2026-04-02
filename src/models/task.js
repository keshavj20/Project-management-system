const mongoose = require("mongoose");

const taskschema = new mongoose.Schema(
  {
  // _id: {type: ObjectId},

    name: { type: String, required: true },
    
    description: String,
    related_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    estimated_hours: { type: Number, required: true },
      assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "On Hold", "Completed"],
      default: "Not Started",
    },
    remark:{
   type :String,
     default:""
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskschema);
