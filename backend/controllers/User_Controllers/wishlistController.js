const Wishlist = require('../../models/Wishlist');
const Movie = require('../../models/Movie');

exports.addToWishlist = async (req, res) => {

  const { movieId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, movies: [] });
    }

    const isAlreadyAdded = wishlist.movies.some(
      (id) => id.toString() === movieId.toString()
    );

    if (isAlreadyAdded) {
      return res.status(400).json({ message: "Movie is already in the wishlist" });
    }

    wishlist.movies.push(movieId);
    await wishlist.save();

    res.json({ message: "Movie added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error); // Log detailed error
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });

    if (!wishlist.movies.includes(movieId)) {
      return res.status(400).json({ error: 'Movie not in wishlist' });
    }

    wishlist.movies = wishlist.movies.filter((id) => id.toString() !== movieId);
    await wishlist.save();

    res.json({ message: 'Movie removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('movies', 'title posterUrl');
    if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });

    res.json(wishlist.movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
