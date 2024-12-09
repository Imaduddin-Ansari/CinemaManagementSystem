const Booking = require('../../models/Booking');
const Movie = require('../../models/Movie');
const User = require('../../models/User');
const Ticket =require('../../models/Ticket');

/**
 * Get all bookings
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
 * Check available seats
 */
const checkAvailableSeats = async (req, res) => {
  const { movieId, showtime } = req.body;

  try {
    const existingBookings = await Booking.find({ movie: movieId, showtime }).select('seats');
    const bookedSeats = existingBookings.reduce((acc, booking) => acc.concat(booking.seats), []);

    const seatOptions = [
      'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
      'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
    ];

    const availableSeats = seatOptions.filter((seat) => !bookedSeats.includes(seat));
    res.status(200).json({ availableSeats });
  } catch (error) {
    console.error('Error checking seats:', error);
    res.status(500).json({ error: 'Unable to check seat availability.' });
  }
};

/**
 * Update a booking
 */
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { seats, showtime, status } = req.body;

  try {
    const existingBookings = await Booking.find({ _id: { $ne: id }, showtime }).select('seats');
    const bookedSeats = existingBookings.reduce((acc, booking) => acc.concat(booking.seats), []);
    const unavailableSeats = seats.filter((seat) => bookedSeats.includes(seat));

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        error: 'Some seats are already booked',
        message: `The following seats are already booked: ${unavailableSeats.join(', ')}`,
      });
    }

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
 * Add a new booking
 */
const addBooking = async (req, res) => {
  const { email, movieId, showtime, seats, paymentType } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const existingBookings = await Booking.find({ movie: movieId, showtime }).select('seats');
    const bookedSeats = existingBookings.reduce((acc, booking) => acc.concat(booking.seats), []);
    const unavailableSeats = seats.filter((seat) => bookedSeats.includes(seat));

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        error: 'Some seats are already booked',
        message: `The following seats are already booked: ${unavailableSeats.join(', ')}`,
      });
    }

    const seatRate = 10; // Fixed rate per seat
    const amount = seats.length * seatRate;

    const newBooking = await Booking.create({
      user: user._id,
      movie: movieId,
      showtime,
      seats,
      payment: { amount, status: 'pending', type: paymentType },
      status: 'confirmed',
      handledBy: req.user.id, // Assuming authenticated employee ID
    });

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Unable to create booking' });
  }
};

/**
 * Print tickets
 */
const printTicket = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the booking and populate the movie and user fields
    const booking = await Booking.findById(id)
      .populate('movie', 'title') // Populate only the title field of the movie
      .populate('user', 'name'); // Populate user and include name and email

      console.log(booking);
      console.log(booking.user);
    // Check if the booking is found and the user is populated
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (!booking.user) {
      return res.status(400).json({ error: 'User not found for this booking' });
    }

    if (booking.printed) {
      return res.status(400).json({ error: 'Ticket already printed for this booking' });
    }

    // Mark booking as printed
    booking.printed = true;
    await booking.save();

    // Create a new Ticket document
    const ticket = new Ticket({
      bookingId: booking._id,   // Store the booking ID
      userId: booking.user._id, // Store the user ID
      seatNumbers: booking.seats, // Store the seats
    });

    await ticket.save(); // Save the new ticket to the database

    // Return the ticket along with user name in the response
    res.status(200).json({
      message: 'Ticket printed successfully',
      ticket,
      userName: booking.user.name,  // Include user's name
      movieTitle: booking.movie.title, // Include movie title  // Include the user's name in the response
    });
  } catch (error) {
    console.error('Error printing ticket:', error);
    res.status(500).json({ error: 'Unable to print ticket' });
  }
};


module.exports = {
  getBookings,
  updateBooking,
  addBooking,
  checkAvailableSeats,
  printTicket, // Ensure this is included
};