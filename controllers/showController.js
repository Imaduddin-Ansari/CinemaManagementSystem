const Show = require('./models/Show');
const Movie = require('../models/Movie');


exports.toggleShowAvailability = async (req, res) => {
  const { showId } = req.params;

  try {
    // Fetch the show by ID
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Calculate available seats
    const availableSeats = show.seatsAvailable > 0;

    // Toggle availability based on current status or admin decision
    show.isAvailable = availableSeats;

    // Save changes
    await show.save();

    res.status(200).json({ message: 'Show availability updated', show });
  } catch (error) {
    res.status(500).json({ message: 'Error updating show availability', error: error.message });
  }
};
// Add a new show
exports.addShow = async (req, res) => {
  try {
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const show = new Show(req.body);
    const savedShow = await show.save();
    res.status(201).json(savedShow);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add show', error: err.message });
  }
};

// Get all shows
exports.getAllShows = async (req, res) => {
  try {
    const shows = await Show.find().populate('movieId', 'title genre');
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch shows', error: err.message });
  }
};

// Update a show
exports.updateShow = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedShow = await Show.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedShow);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update show', error: err.message });
  }
};

// Delete a show
exports.deleteShow = async (req, res) => {
  const { id } = req.params;
  try {
    await Show.findByIdAndDelete(id);
    res.status(200).json({ message: 'Show deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete show', error: err.message });
  }
};
