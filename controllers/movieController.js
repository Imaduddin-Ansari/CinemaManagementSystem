const Movie = require('../models/Movie');
const Show = require('../models/Show');

exports.getMovies = async (req, res) => {
  const { genre, showtime, availability } = req.query;
  try {
    // Build query object for filtering
    const query = {};

    // Filter by genre
    if (genre) query.genre = { $in: genre.split(',') }; // Allows multiple genres

    // Get shows matching the showtime filter (if provided)
    let shows = [];
    if (showtime) {
      shows = await Show.find({ showTime: showtime }).distinct('movieId');
      query._id = { $in: shows }; // Filter movies based on shows
    }

    // Fetch movies based on filters
    let movies = await Movie.find(query);

    // Filter by availability (if provided)
    if (availability === 'available') {
      movies = await Promise.all(
        movies.map(async (movie) => {
          const totalAvailableShows = await Show.countDocuments({
            movieId: movie._id,
            isAvailable: true,
          });
          return totalAvailableShows > 0 ? movie : null;
        })
      );
      movies = movies.filter((movie) => movie !== null);
    }

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: "Failed to add movie", error: err.message });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies", error: err.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: "Failed to update movie", error: err.message });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete movie", error: err.message });
  }
};
