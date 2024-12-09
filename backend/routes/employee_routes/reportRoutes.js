const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/employee_controllers/reportController');
const { isEmployee } = require('../../middleware/auth');
const authenticate = require('../../middleware/auth');
// Generate an end-of-day report
router.post('/generate', authenticate.authMiddleware,isEmployee, reportController.generateReport);

// Fetch all reports
router.get('/', authenticate.authMiddleware,isEmployee, reportController.getAllReports);

// Fetch a specific report by ID
router.get('/:reportId', authenticate.authMiddleware,isEmployee, reportController.getReportById);
router.delete('/:reportId',authenticate.authMiddleware,isEmployee, reportController.deleteReport);
module.exports = router;
