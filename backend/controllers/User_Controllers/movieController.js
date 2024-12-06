const Movie = require('../../models/Movie');

// Add Movie
exports.addMovie = async (req, res) => {
  const { title, genre, releaseDate, rating, description, duration, posterUrl } = req.body;
  try {
    const movieCount = await Movie.countDocuments();
    const newMovie = new Movie({ id: movieCount + 1, title, genre, releaseDate, rating, description, duration, posterUrl });
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully', movieId: newMovie.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Movie Details
exports.getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({ id });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
