const express = require('express');
const { addMovie, getMovies, getMovieDetails,getTrendingMovie,getTMDBMovieTrailers,getTMDBMovieDetails} = require('../../controllers/User_Controllers/movieController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/toprated',authenticate,getTrendingMovie);
router.get('/:id/trailers',authenticate,getTMDBMovieTrailers);
router.get('/:id/details',authenticate,getTMDBMovieDetails);
router.post('/add', addMovie);
router.get('/', getMovies);
router.get('/:id', getMovieDetails);

module.exports = router;
