const express = require('express');
const router = express.Router();
const { getDashboardMetrics } = require('../../controllers/Admin_Controller/adminDashboardController');

router.get('/metrics', getDashboardMetrics);

module.exports = router;
