const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// Sample initial data if user has no leaves yet
const seedInitialLeaves = async (userId) => {
  const count = await Leave.countDocuments({ user: userId });
  if (count === 0) {
    const demoLeaves = [
      {
        user: userId,
        leaveType: 'casual',
        fromDate: new Date('2026-08-05'),
        toDate: new Date('2026-08-06'),
        days: 2,
        reason: 'Personal family work',
        status: 'Pending',
      },
      {
        user: userId,
        leaveType: 'sick',
        fromDate: new Date('2026-07-20'),
        toDate: new Date('2026-07-21'),
        days: 2,
        reason: 'Viral fever and rest',
        status: 'Approved',
      },
      {
        user: userId,
        leaveType: 'annual',
        fromDate: new Date('2026-06-10'),
        toDate: new Date('2026-06-12'),
        days: 3,
        reason: 'Out of town trip',
        status: 'Rejected',
      },
    ];
    await Leave.insertMany(demoLeaves);
  }
};

// @route   POST /api/leaves/apply
// @desc    Apply for leave
// @access  Private
router.post('/apply', protect, async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const timeDiff = end.getTime() - start.getTime();

    if (timeDiff < 0) {
      return res.status(400).json({ message: 'End date cannot be before start date' });
    }

    const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    const leave = await Leave.create({
      user: req.user._id,
      leaveType,
      fromDate: start,
      toDate: end,
      days,
      reason,
      status: 'Pending',
    });

    res.status(201).json({
      message: 'Leave application submitted successfully',
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/leaves/my-leaves
// @desc    Get user's leaves
// @access  Private
router.get('/my-leaves', protect, async (req, res) => {
  try {
    await seedInitialLeaves(req.user._id);
    const leaves = await Leave.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/leaves/balance
// @desc    Get user's leave balance & statistics
// @access  Private
router.get('/balance', protect, async (req, res) => {
  try {
    await seedInitialLeaves(req.user._id);
    const user = await User.findById(req.user._id);
    const leaves = await Leave.find({ user: req.user._id });

    // Calculate live statistics
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    let totalUsedDays = 0;

    leaves.forEach((l) => {
      if (l.status === 'Pending') pendingCount++;
      if (l.status === 'Approved') {
        approvedCount++;
        totalUsedDays += l.days;
      }
      if (l.status === 'Rejected') rejectedCount++;
    });

    const defaultBalance = user.leaveBalance || {
      casual: { total: 12, used: 4 },
      sick: { total: 10, used: 5 },
      annual: { total: 20, used: 5 },
      emergency: { total: 5, used: 2 },
    };

    const totalAllowed =
      defaultBalance.casual.total +
      defaultBalance.sick.total +
      defaultBalance.annual.total +
      defaultBalance.emergency.total;

    res.json({
      totalAllowed,
      totalUsedDays,
      remainingTotal: totalAllowed - totalUsedDays,
      pendingRequests: pendingCount,
      approvedRequests: approvedCount,
      rejectedRequests: rejectedCount,
      leaveBalance: defaultBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/leaves/all
// @desc    Get all leaves (for manager/admin)
// @access  Private
router.get('/all', protect, async (req, res) => {
  try {
    const leaves = await Leave.find().populate('user', 'name email department').sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/leaves/:id/status
// @desc    Update leave status (Approve/Reject)
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leave.status = status;
    await leave.save();

    res.json({ message: `Leave application ${status.toLowerCase()}`, leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
