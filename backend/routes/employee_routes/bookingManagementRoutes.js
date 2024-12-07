const express = require('express');
const router = express.Router();
const { 
  getBookings, 
  updateBooking, 
  rebookCustomer, 
  printTicket 
} = require('../../controllers/employee_controllers/bookingManagementController');
const authenticate = require('../../middleware/auth');
const { isEmployee } = require('../../middleware/auth');
// Route to view all bookings
router.get('/bookings',authenticate.authMiddleware,isEmployee, getBookings);

// Route to update a booking
router.put('/bookings/:id',authenticate.authMiddleware,isEmployee, updateBooking);

// Route to rebook on behalf of a customer
router.post('/bookings/rebook/:id',authenticate.authMiddleware,isEmployee, rebookCustomer);

// Route to print tickets
router.get('/bookings/print/:id',authenticate.authMiddleware,isEmployee, printTicket);

module.exports = router;
