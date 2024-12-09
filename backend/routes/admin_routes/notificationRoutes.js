const express = require('express');
const { addNotification, getNotifications } = require('../../controllers/Admin_Controllers/notificationController');
const router = express.Router();
const twilio = require('twilio');
const BookingAdmin = require('../../models/AdminModel/Movie'); // Adjust path as per your file structure
const UserAdmin = require('../../models/AdminModel/Movie'); // Adjust path as per your file structure


router.post('/', addNotification);
router.get('/', getNotifications);

// Initialize Twilio Client

// Send reminder before movies
router.post('/send-reminder', async (req, res) => {
  try {
    const { bookingId } = req.body; // Booking ID from request
    const booking = await BookingAdmin.findById(bookingId).populate('user').populate('movie');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const user = booking.user;
    const movie = booking.movie;

    const message = `Hi ${user.name}, this is a reminder for your movie "${movie.title}" on ${new Date(
      booking.showtime
    ).toDateString()} at ${new Date(booking.showtime).toLocaleTimeString()}. Enjoy your show!`;

    // Send SMS via Twilio
    await client.messages.create({
      body: message,
      from,
      to: user.contact.phone,
    });

    res.status(200).json({ message: 'Reminder sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reminder', error });
  }
});

// Send marketing offers
router.post('/send-offers', async (req, res) => {
  try {
    const { offerMessage } = req.body; // Marketing message from request
    const users = await UserAdmin.find({}); // Fetch all users

    const phoneNumbers = users.map((user) => user.contact.phone);

    // Send offer SMS to all users
    await Promise.all(
      phoneNumbers.map((phone) =>
        client.messages.create({
          body: offerMessage,
          from,
          to: phone,
        })
      )
    );

    res.status(200).json({ message: 'Offer notifications sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending offer notifications', error });
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { sendNotification } = require('../controllers/adminNotificationsController');

// router.post('/send', sendNotification);

// module.exports = router;


