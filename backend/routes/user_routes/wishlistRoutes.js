const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../../controllers/User_Controllers/wishlistController');
const authenticate = require('../../middleware/auth');

const router = express.Router();

router.post('/add', authenticate.authMiddleware, addToWishlist);
router.delete('/remove', authenticate.authMiddleware, removeFromWishlist);
router.get('/', authenticate.authMiddleware, getWishlist);

module.exports = router;
