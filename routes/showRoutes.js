const express = require('express');
const { addShow, getAllShows, updateShow, deleteShow } = require('../controllers/showController');
const { toggleShowAvailability } = require('../controllers/adminShowsController');
const router = express.Router();

module.exports = router;
router.post('/', addShow);
router.get('/', getAllShows);
router.put('/:id', updateShow);
router.delete('/:id', deleteShow);

router.patch('/toggle-availability/:showId', toggleShowAvailability);


module.exports = router;
