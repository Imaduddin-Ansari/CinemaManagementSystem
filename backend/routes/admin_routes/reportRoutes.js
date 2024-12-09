const express = require('express');
const { generateReport } = require('../../controllers/Admin_Controllers/reportController');
const router = express.Router();

router.get('/', generateReport);

module.exports = router;
