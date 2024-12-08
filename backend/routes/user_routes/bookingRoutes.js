const express = require('express');
const { bookTicket, getBookingHistory, cancelBooking, modifyBooking,addShowtimes } = require('../../controllers/User_Controllers/bookingController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.post('/book', authenticate.authMiddleware, bookTicket);
router.get('/history', authenticate.authMiddleware, getBookingHistory);
router.delete('/:id/cancel', authenticate.authMiddleware, cancelBooking);
router.put('/:id/modify', authenticate.authMiddleware, modifyBooking);

module.exports = router;
