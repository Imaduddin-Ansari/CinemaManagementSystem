const express = require('express');
const router = express.Router();
const shiftController = require('../../controllers/employee_controllers/shiftController');
const { isEmployee } = require('../../middleware/auth');
const authenticate = require('../../middleware/auth');
// View all assigned shifts for the logged-in employee
router.get('/shifts', authenticate.authMiddleware,isEmployee, shiftController.getAssignedShifts);

// View specific shift details
router.get('/shifts/:shiftId', authenticate.authMiddleware,isEmployee, shiftController.getShiftDetails);

// Request a change of schedule for a specific shift
router.post('/shifts/request-change', authenticate.authMiddleware, isEmployee, shiftController.requestShiftChange);

module.exports = router;
