// Book Ticket
const Booking = require('../../models/Booking');
const Movie = require('../../models/Movie');

// Book Ticket
exports.bookTicket = async (req, res) => {
  const { movieId, showtime, seats, payment } = req.body;
  const user = req.user.id;

  console.log(movieId, showtime, seats, payment);

  try {
    // Validate payment object
    if (
      !payment ||
      !payment.amount ||
      !payment.status ||
      !['success', 'failed', 'pending'].includes(payment.status) ||
      !payment.type ||
      !['Credit Card', 'Cash', 'Debit Card'].includes(payment.type)
    ) {
      return res.status(400).json({
        error: 'Invalid payment details',
        message: 'Please check your payment details and try again.',
      });
    }

    // Fetch the movie to check seat availability
    const movieDetails = await Movie.findById(movieId);
    if (!movieDetails) {
      return res.status(404).json({
        error: 'Movie not found',
        message: 'Sorry, the movie you are looking for was not found.',
      });
    }

    // Check if the requested seats are available for the given movie and showtime
    const existingBookings = await Booking.find({ movie: movieId, showtime }).select('seats');
    const bookedSeats = existingBookings.reduce((acc, booking) => {
      return acc.concat(booking.seats);
    }, []);

    const unavailableSeats = seats.filter(seat => bookedSeats.includes(seat));

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        error: 'Some seats are already booked',
        message: `The following seats are already booked: ${unavailableSeats.join(', ')}`,
      });
    }

    // Create the booking entry
    const booking = new Booking({ user, movie: movieId, showtime, seats, payment });
    await booking.save();

    res.status(201).json({
      message: 'Booking successful',
      bookingId: booking._id,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
};


// Get Booking History
exports.getBookingHistory = async (req, res) => {
  const user = req.user.id;

  try {
    const bookings = await Booking.find({ user }).populate('movie', 'title posterUrl');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to fetch your booking history. Please try again later.',
    });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const user = req.user.id;

  try {
    const booking = await Booking.findOne({ _id: id, user });
    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found',
        message: 'The booking you are trying to cancel does not exist.',
      });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'An error occurred while cancelling your booking. Please try again.',
    });
  }
};

// Modify Booking
exports.modifyBooking = async (req, res) => {
  const { id } = req.params;
  const { showtime, seats, payment } = req.body;
  const user = req.user.id;

  try {
    const booking = await Booking.findOne({ _id: id, user });
    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found',
        message: 'The booking you are trying to modify does not exist.',
      });
    }

    if (showtime) booking.showtime = showtime;
    if (seats) booking.seats = seats;

    if (payment) {
      // Validate payment object
      if (
        payment.amount !== undefined &&
        payment.status &&
        !['success', 'failed', 'pending'].includes(payment.status)
      ) {
        return res.status(400).json({
          error: 'Invalid payment status',
          message: 'Please check the payment status and try again.',
        });
      }
      if (
        payment.type !== undefined &&
        !['Credit Card', 'Cash', 'Debit Card'].includes(payment.type)
      ) {
        return res.status(400).json({
          error: 'Invalid payment type',
          message: 'Please select a valid payment method and try again.',
        });
      }

      booking.payment = {
        ...booking.payment,
        ...payment,
      };
    }

    await booking.save();
    res.json({
      message: 'Booking updated successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'An error occurred while updating your booking. Please try again.',
    });
  }
};
