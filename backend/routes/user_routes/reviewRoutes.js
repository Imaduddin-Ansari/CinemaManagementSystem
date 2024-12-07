const express = require('express');
const { addReview,getReviews } = require('../../controllers/User_Controllers/reviewController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.post('/add', authenticate.authMiddleware, addReview);
router.get('/', authenticate.authMiddleware, getReviews);

module.exports = router;
