const express = require('express');
const { addMovie, getAllMovies, updateMovie, deleteMovie,getMovies } = require('../../controllers/Admin_Controllers/movieController');
const router = express.Router();

router.post('/', addMovie);
router.get('/', getAllMovies);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/filter', getMovies);


module.exports = router;
