const Booking = require('../../models/Booking'); // Assuming Booking model is in 'models/booking.js'
const Movie = require('../../models/Movie'); // Assuming Movie model is in 'models/movie.js'

/**
 * View all bookings
 */
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('movie user', 'title name email');
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Unable to fetch bookings' });
  }
};

/**
 * Update a booking
 */
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { seats, showtime, status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { seats, showtime, status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Unable to update booking' });
  }
};

/**
 * Rebook on behalf of a customer
 */
const rebookCustomer = async (req, res) => {
  const { id } = req.params; // Original booking ID
  const { newShowtime, newSeats } = req.body;

  try {
    const originalBooking = await Booking.findById(id);

    if (!originalBooking) {
      return res.status(404).json({ error: 'Original booking not found' });
    }

    const rebooked = await Booking.create({
      user: originalBooking.user,
      movie: originalBooking.movie,
      showtime: newShowtime,
      seats: newSeats,
      payment: originalBooking.payment, // Reuse payment details
      handledBy: req.user.id, // Assuming authenticated employee ID
    });

    res.status(201).json({ message: 'Rebooked successfully', booking: rebooked });
  } catch (error) {
    console.error('Error rebooking customer:', error);
    res.status(500).json({ error: 'Unable to rebook customer' });
  }
};

/**
 * Print tickets
 */
const printTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id).populate('movie user', 'title name email');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.printed) {
      return res.status(400).json({ error: 'Ticket already printed for this booking' });
    }

    // Mark booking as printed
    booking.printed = true;
    await booking.save();

    // Simulate ticket generation
    const ticket = {
      customerName: booking.user.name,
      movieTitle: booking.movie.title,
      showtime: booking.showtime,
      seats: booking.seats,
    };

    res.status(200).json({ message: 'Ticket printed successfully', ticket });
  } catch (error) {
    console.error('Error printing ticket:', error);
    res.status(500).json({ error: 'Unable to print ticket' });
  }
};

module.exports = {
  getBookings,
  updateBooking,
  rebookCustomer,
  printTicket,
};
