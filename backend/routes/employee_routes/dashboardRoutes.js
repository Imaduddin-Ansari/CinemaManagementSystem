const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../../controllers/employee_controllers/dashboardController');
const authenticate = require('../../middleware/auth');
const { isEmployee } = require('../../middleware/auth');
// Route for fetching dashboard data
router.get('/dashboard',authenticate.authMiddleware,isEmployee, getDashboardData);

module.exports = router;
