const Wishlist = require('../../models/Wishlist');
const Movie = require('../../models/Movie');

exports.addToWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "You must be logged in to add a movie to your wishlist." });
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
      return res.status(400).json({ error: "This movie is already in your wishlist." });
    }

    wishlist.movies.push(movieId);
    await wishlist.save();

    res.json({ message: "Movie successfully added to your wishlist!" });
  } catch (error) {
    console.error("Error adding to wishlist:", error); // Log detailed error
    res.status(500).json({ error: "There was an issue adding the movie to your wishlist. Please try again later." });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found. Please try again." });

    if (!wishlist.movies.includes(movieId)) {
      return res.status(400).json({ error: "This movie is not in your wishlist." });
    }

    wishlist.movies = wishlist.movies.filter((id) => id.toString() !== movieId);
    await wishlist.save();

    res.json({ message: "Movie successfully removed from your wishlist!" });
  } catch (error) {
    res.status(500).json({ error: "There was an issue removing the movie from your wishlist. Please try again later." });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('movies', 'title posterUrl');
    if (!wishlist) return res.status(404).json({ error: "You have no wishlist items. Add some movies to your wishlist!" });

    res.json(wishlist.movies);
  } catch (error) {
    res.status(500).json({ error: "There was an issue fetching your wishlist. Please try again later." });
  }
};
