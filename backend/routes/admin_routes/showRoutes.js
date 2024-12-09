const express = require('express');
const { addShow, getAllShows, updateShow, deleteShow,toggleShowAvailability } = require('../../controllers/Admin_Controllers/showController');
const router = express.Router();

module.exports = router;
router.post('/', addShow);
router.get('/', getAllShows);
router.put('/:id', updateShow);
router.delete('/:id', deleteShow);
router.patch('/toggle-availability/:showId', toggleShowAvailability);


module.exports = router;
