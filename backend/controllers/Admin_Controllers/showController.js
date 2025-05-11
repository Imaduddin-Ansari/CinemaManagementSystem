const ShowAdmin = require('../../models/AdminModel/Movie'); // Corrected import for Show model
const MovieAdmin = require('../../models/AdminModel/Movie'); // Correct import for Movie model

exports.toggleShowAvailability = async (req, res) => {
  const { showId } = req.params;

  try {
    // Fetch the show by ID
    const show = await ShowAdmin.findById(showId); // Use ShowAdmin to fetch the show
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
    const movie = await MovieAdmin.findById(req.body.movieId); // Use MovieAdmin to find the movie
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const show = new ShowAdmin(req.body); // Create new Show using ShowAdmin model
    const savedShow = await show.save();
    res.status(201).json(savedShow);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add show', error: err.message });
  }
};

// Get all shows
exports.getAllShows = async (req, res) => {
  try {
    const shows = await ShowAdmin.find().populate('movieId', 'title genre'); // Populate movie details using ShowAdmin model
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch shows', error: err.message });
  }
};

// Update a show
exports.updateShow = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedShow = await ShowAdmin.findByIdAndUpdate(id, req.body, { new: true }); // Update show using ShowAdmin model
    res.status(200).json(updatedShow);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update show', error: err.message });
  }
};

// Delete a show
exports.deleteShow = async (req, res) => {
  const { id } = req.params;
  try {
    await ShowAdmin.findByIdAndDelete(id); // Delete show using ShowAdmin model
    res.status(200).json({ message: 'Show deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete show', error: err.message });
  }
};
