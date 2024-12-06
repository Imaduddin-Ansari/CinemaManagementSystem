const Booking = require('../models/Booking');
const { parse } = require('json2csv');
const fs = require('fs');

exports.generateReport = async (req, res) => {

  try {
    const filter = {};
    if (type === 'daily') filter.date = { $gte: new Date(new Date().setHours(0, 0, 0, 0)) };
    if (type === 'weekly') filter.date = { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) };
    if (type === 'monthly') filter.date = { $gte: new Date(new Date().setDate(1)) };

    const bookings = await Booking.find(filter);

    const reportData = bookings.map(booking => ({
      BookingID: booking.id,
      User: booking.user,
      Movie: booking.movie,
      Seats: booking.seats.join(', '),
      Amount: booking.payment.amount,
      Status: booking.status,
    }));

    const csv = parse(reportData);
    fs.writeFileSync('./reports/report.csv', csv);

    res.status(200).json({ message: 'Report generated', path: './reports/report.csv' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
