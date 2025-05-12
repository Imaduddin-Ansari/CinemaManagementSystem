const Report = require('../../models/Report');
const Booking = require('../../models/Booking');
const Review = require('../../models/Review');
const mongoose = require('mongoose');

/**
 * Generate an end-of-day report for bookings or customer inquiries.
 */
const generateReport = async (req, res) => {
  try {
    const { type } = req.body; // 'booking' or 'inquiry'
    const generatedBy = req.user.id; // Assuming authenticated employee's ID is in req.user

    if (!type || !['booking', 'inquiry', 'other'].includes(type)) {
      return res.status(400).json({ error: "Invalid report type. Allowed: 'booking', 'inquiry', 'other'." });
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    console.log(startOfDay);
    console.log(endOfDay);
    const rawBookings = await Booking.find({
        showtime: { $gte: startOfDay, $lte: endOfDay },
      });
      console.log('Raw Bookings:', rawBookings);
    let data;

    // Generate data based on the type of report
    if (type === 'booking') {
      data = await Booking.aggregate([
        { $match: { showtime: { $gte: startOfDay, $lte: endOfDay } } },
        {
          $group: {
            _id: '$movie',
            totalBookings: { $sum: 1 },
            totalSeats: { $sum: { $size: '$seats' } },
            totalRevenue: { $sum: '$payment.amount' },
          },
        },
        {
          $lookup: {
            from: 'movies',
            localField: '_id',
            foreignField: '_id',
            as: 'movieDetails',
          },
        },
        { $unwind: '$movieDetails' },
      ]);
      if (data.length === 0) {
        return res.status(200).json({ message: 'No bookings found for the day.'});
      }
    } else if (type === 'inquiry') {
      data = await Review.aggregate([
        { $match: { date: { $gte: startOfDay, $lte: endOfDay } } },
        {
          $group: {
            _id: '$status',
            total: { $sum: 1 },
          },
        },
      ]);
    } else {
      data = { message: 'Custom report type. Add your data manually.' };
    }

    // Save the report in the database
    const report = new Report({
      generatedBy,
      date: new Date(),
      type,
      data,
    });

    await report.save();

    // Populate the generatedBy field after saving the report
    const populatedReport = await Report.findById(report._id).populate('generatedBy', 'name email'); 

    res.status(201).json({ message: 'Report generated successfully.', report: populatedReport });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report.' });
  }
};

/**
 * Fetch all reports.
 */
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 }) // Most recent first
      .populate('generatedBy', 'name email'); // Populate employee details if needed

    res.status(200).json({ reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports.' });
  }
};

/**
 * Fetch a specific report by ID.
 */
const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({ error: 'Invalid report ID.' });
    }

    const report = await Report.findById(reportId)
      .populate('generatedBy', 'name email'); // Populate employee details if needed

    if (!report) {
      return res.status(404).json({ error: 'Report not found.' });
    }

    res.status(200).json({ report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Failed to fetch report.' });
  }
};
// Function to delete a report
const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({ error: 'Invalid report ID.' });
    }

    const report = await Report.findById(reportId);
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found.' });
    }

    await report.deleteOne();  // Delete the report from the database

    res.status(200).json({ message: 'Report deleted successfully.' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Failed to delete report.' });
  }
};

module.exports = {
  generateReport,
  getAllReports,
  getReportById,
  deleteReport,  // Export deleteReport function
};