const express = require('express');
const { addReview,getReview } = require('../../controllers/User_Controllers/reviewController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.post('/add', authenticate, addReview);
router.get('/', authenticate, getReview);

module.exports = router;
