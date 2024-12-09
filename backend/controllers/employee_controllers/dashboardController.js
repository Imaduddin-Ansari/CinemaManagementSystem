const Booking = require('../../models/Booking'); // Assuming Booking model is in 'models/booking.js'
const Shift = require('../../models/Shift'); // Assuming Shift model is in 'models/shift.js'
const Notification = require('../../models/Notification'); // Assuming User model is in 'models/user.js'
const mongoose = require('mongoose'); // Ensure Mongoose is required

const getDashboardData = async (req, res) => {
  try {
    const employeeId = req.user.id; // Assuming req.user contains the authenticated employee's data

    // Ensure employeeId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    // Fetch bookings for the day
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const bookingsOfTheDay = await Booking.find({
      showtime: { $gte: startOfDay, $lte: endOfDay },
      handledBy: employeeId,
    }).populate('movie', 'title');

    // Fetch assigned duties (shifts)
    const assignedDuties = await Shift.find({
      employeeId:employeeId, 
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    // Fetch alerts (notifications)
    const alerts = await Notification.find({ userId: employeeId }).sort({ date: -1 });

    // Prepare response data
    res.status(200).json({
      bookings: bookingsOfTheDay,
      duties: assignedDuties,
      alerts: alerts,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Unable to fetch dashboard data' });
  }
};

module.exports = {
  getDashboardData,
};
