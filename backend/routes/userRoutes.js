const express = require('express');
const { registerUser, loginUser, logoutUser, viewProfile, editProfile } = require('../controllers/userController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authenticate.authMiddleware, viewProfile);
router.put('/profile', authenticate.authMiddleware, editProfile);

module.exports = router;
