const express = require('express');
const { addNotification, getNotifications } = require('../controllers/notificationController');
const router = express.Router();

router.post('/', addNotification);
router.get('/', getNotifications);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { sendNotification } = require('../controllers/adminNotificationsController');

// router.post('/send', sendNotification);

// module.exports = router;
