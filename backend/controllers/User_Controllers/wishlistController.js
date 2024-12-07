const User = require('../../models/User');

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.wishlist.includes(movieId)) {
      user.wishlist.push(movieId);
      await user.save();
    }
    res.json({ message: 'Movie added to wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.wishlist = user.wishlist.filter(id => id !== movieId);
    await user.save();
    res.json({ message: 'Movie removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ id: userId }).populate('wishlist', 'title posterUrl');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
