const BookingAdmin = require('../../models/AdminModel/Movie');  // Correct import
const { parse } = require('json2csv');
const fs = require('fs');

exports.generateReport = async (req, res) => {
  try {
    const { type } = req.body;  // Or req.query, depending on where you're sending the type in the request
    const filter = {};

    // Apply the filter based on the report type
    if (type === 'daily') {
      filter.date = { $gte: new Date(new Date().setHours(0, 0, 0, 0)) };
    } else if (type === 'weekly') {
      filter.date = { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) };
    } else if (type === 'monthly') {
      filter.date = { $gte: new Date(new Date().setDate(1)) };
    } else {
      return res.status(400).json({ message: 'Invalid report type. Use "daily", "weekly", or "monthly".' });
    }

    // Fetch bookings based on the filter
    const bookings = await BookingAdmin.find(filter);  // Using BookingAdmin to fetch bookings

    // Prepare the report data
    const reportData = bookings.map(booking => ({
      BookingID: booking._id,  // Corrected to use _id instead of id
      User: booking.user.name,  // Assuming user has a name field, populate user if needed
      Movie: booking.movie.title,  // Assuming movie has a title field, populate movie if needed
      Seats: booking.seats.join(', '),
      Amount: booking.payment.amount,
      Status: booking.status,
    }));

    // Convert to CSV format
    const csv = parse(reportData);
    
    // Write the CSV file
    fs.writeFileSync('./reports/report.csv', csv);

    // Respond with a success message and the file path
    res.status(200).json({ message: 'Report generated', path: './reports/report.csv' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
