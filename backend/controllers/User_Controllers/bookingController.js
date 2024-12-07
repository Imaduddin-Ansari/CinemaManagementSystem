const Booking = require('../../models/Booking');

// Book Ticket
exports.bookTicket = async (req, res) => {
  const { movie, showtime, seats, payment } = req.body;
  const user = req.user._id; // Use ObjectId from `req.user`

  try {
    const booking = new Booking({ user, movie, showtime, seats, payment });
    await booking.save();
    res.status(201).json({ message: 'Booking successful', bookingId: booking._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Booking History
exports.getBookingHistory = async (req, res) => {
  const user = req.user._id; // Use ObjectId from `req.user`

  try {
    const bookings = await Booking.find({ user }).populate('movie', 'title posterUrl');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  const { id } = req.params; // `id` is the booking's `_id`
  const user = req.user._id; // Use ObjectId from `req.user`

  try {
    const booking = await Booking.findOne({ _id: id, user });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modify Booking
exports.modifyBooking = async (req, res) => {
  const { id } = req.params; // `id` is the booking's `_id`
  const { showtime, seats } = req.body;
  const user = req.user._id; // Use ObjectId from `req.user`

  try {
    const booking = await Booking.findOne({ _id: id, user });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (showtime) booking.showtime = showtime;
    if (seats) booking.seats = seats;

    await booking.save();
    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
