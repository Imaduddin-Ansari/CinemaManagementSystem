const Review = require('../../models/Review');
const Movie = require('../../models/Movie');

// Add Review
exports.addReview = async (req, res) => {
  const { stars, comment, movieId } = req.body;
  const userId = req.user.id; // Extracted from auth middleware

  try {
    // Create a new review
    const review = new Review({
      stars,
      comment,
      movieId,
      userId,
      reply: '', // Default empty reply
      status: 'open' // Default status
    });
    await review.save();

    // Update the movie's average rating
    const reviews = await Review.find({ movieId });
    const avgRating =
      reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;

    await Movie.findByIdAndUpdate(movieId, { rating: avgRating });

    res.status(201).json({ message: 'Review added successfully', reviewId: review._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('movieId', 'title')
      .populate('userId', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params; // Grab movieId from the URL parameter

  try {
    // Fetch reviews for the given movieId
    const reviews = await Review.find({ movieId })
      .populate('userId', 'name') // Assuming userId is a reference to a User model
      .sort({ createdAt: -1 });

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this movie' });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};