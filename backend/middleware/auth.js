const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Set the user in req.user
    if (!req.user) return res.status(404).json({ error: 'User not found' });
    next(); // Continue to the route handler
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate token' });
  }
};

module.exports = authMiddleware;
