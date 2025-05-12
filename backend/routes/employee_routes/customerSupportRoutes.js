const express = require('express');
const router = express.Router();
const customerSupportController = require('../../controllers/employee_controllers/customerSupportController');
const { isEmployee } = require('../../middleware/auth');
const authenticate = require('../../middleware/auth');
// Fetch all reviews
router.get('/reviews', customerSupportController.getAllReviews);

// Fetch a specific review by ID
router.get('/reviews/:reviewId', customerSupportController.getReviewById);

// Update a review (reply and/or status)
router.put('/reviews/:reviewId',authenticate.authMiddleware,isEmployee, customerSupportController.updateReview);

module.exports = router;
