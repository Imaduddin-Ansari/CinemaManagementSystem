const express = require('express');
const { addMovie, getMovies, getMovieDetails } = require('../../controllers/User_Controllers/movieController');

const router = express.Router();

router.post('/add', addMovie);
router.get('/', getMovies);
router.get('/:id', getMovieDetails);

module.exports = router;
