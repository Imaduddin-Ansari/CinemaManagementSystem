const Review = require('../../models/Review');

/**
 * Fetch all reviews, including their associated movie and user details.
 */
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('movieId', 'title') // Populate movie details (e.g., title)
      .populate('userId', 'name email') // Populate user details (e.g., name, email)
      .sort({ createdAt: -1 }); // Sort reviews by creation date

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews.' });
  }
};

/**
 * Fetch a specific review by its ID.
 */
const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId)
      .populate('movieId', 'title')
      .populate('userId', 'name email');

    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    res.status(200).json({ review });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review.' });
  }
};

/**
 * Update a review's reply and status.
 */
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reply, status } = req.body;

    // Validate status, if provided
    const validStatuses = ['open', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed values: ${validStatuses.join(', ')}` });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { reply, status },
      { new: true } // Return the updated document
    )
      .populate('movieId', 'title')
      .populate('userId', 'name email');

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    res.status(200).json({ review: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review.' });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  updateReview,
};
