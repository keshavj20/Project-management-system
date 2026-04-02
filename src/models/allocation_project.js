const mongoose = require("mongoose");

const projectAllocationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  // status_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: false
  // },
  time_period: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  }

}, { timestamps: true });
 module.exports=mongoose.model('ProjectAllocation', projectAllocationSchema);
