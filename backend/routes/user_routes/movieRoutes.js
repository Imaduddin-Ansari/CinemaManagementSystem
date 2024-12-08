const express = require('express');
const { addShowtimes,addMovie, getMovies, getMovieDetails,getTrendingMovie,getTMDBMovieTrailers,getTMDBMovieDetails,searchMovie} = require('../../controllers/User_Controllers/movieController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.get('/toprated',authenticate.authMiddleware,getTrendingMovie);
router.get('/:id/trailers',authenticate.authMiddleware,getTMDBMovieTrailers);
router.get('/:id/details',authenticate.authMiddleware,getTMDBMovieDetails);
router.get("/movie/:query",searchMovie);
router.post('/add', addMovie);
router.get('/', getMovies);
router.get('/:id', getMovieDetails);
router.put('/:id/showtimes', authenticate.authMiddleware,addShowtimes);

module.exports = router;
