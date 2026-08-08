const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leaveType: {
      type: String,
      required: [true, 'Leave type is required'],
      enum: ['casual', 'sick', 'annual', 'emergency'],
    },
    fromDate: {
      type: Date,
      required: [true, 'From date is required'],
    },
    toDate: {
      type: Date,
      required: [true, 'To date is required'],
    },
    days: {
      type: Number,
      required: true,
      min: 1,
    },
    reason: {
      type: String,
      required: [true, 'Reason is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Leave', leaveSchema);
