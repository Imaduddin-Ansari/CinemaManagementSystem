const express = require('express');
const { bookTicket, getBookingHistory, cancelBooking, modifyBooking } = require('../../controllers/User_Controllers/bookingController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.post('/book', authenticate, bookTicket);
router.get('/history', authenticate, getBookingHistory);
router.delete('/:id/cancel', authenticate, cancelBooking);
router.put('/:id/modify', authenticate, modifyBooking);

module.exports = router;
