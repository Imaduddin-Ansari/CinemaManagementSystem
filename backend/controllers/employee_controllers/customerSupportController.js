// Import necessary models
const Booking = require('../../models/Booking'); // Path to Booking model
const mongoose = require('mongoose');

// Function to fetch booking records for a specific customer
const getBookingRecords = async (req, res) => {
  try {
    const { customerId } = req.params; // Get customerId from request parameters

    // Validate customerId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }

    // Fetch bookings associated with the customer
    const bookings = await Booking.find({ customerId }).sort({ showtime: -1 });

    // If no bookings found
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this customer' });
    }

    // Respond with booking data
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching booking records:', error);
    res.status(500).json({ error: 'Unable to fetch booking records' });
  }
};

// Function to fetch a specific booking record by booking ID
const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params; // Get bookingId from request parameters

    // Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }

    // Fetch the booking by ID
    const booking = await Booking.findById(bookingId);

    // If no booking found
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Respond with booking details
    res.status(200).json({ booking });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Unable to fetch booking details' });
  }
};

module.exports = {
  getBookingRecords,
  getBookingDetails,
};
