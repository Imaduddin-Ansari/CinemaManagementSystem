const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../../controllers/User_Controllers/wishlistController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.post('/add', authenticate, addToWishlist);
router.delete('/remove', authenticate, removeFromWishlist);
router.get('/', authenticate, getWishlist);

module.exports = router;
