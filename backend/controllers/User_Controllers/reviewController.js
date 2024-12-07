const Review = require('../../models/Review');

// Add Review
exports.addReview = async (req, res) => {
    const { stars, comment, movieId } = req.body;
    const userId = req.user.id; // Extracted from auth middleware
    try {
      const reviewCount = await Review.countDocuments();
      const review = new Review({ id: reviewCount + 1, stars, comment, movieId, userId });
      await review.save();
  
      // Optionally, you can update the movie's average rating here
      const reviews = await Review.find({ movieId });
      const avgRating = reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
      await Movie.findOneAndUpdate({ id: movieId }, { rating: avgRating });
  
      res.status(201).json({ message: 'Review added successfully', reviewId: review.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get Reviews
exports.getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviewws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};