const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Only require name, email, and password

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Count the current number of users to assign a new ID
    const userCount = await User.countDocuments();

    // Create the new user with default values for other fields
    const newUser = new User({
      id: userCount + 1,
      name,
      email,
      password: hashedPassword,
      role: 'user', // Default role
      contact: { phone: '', address: '' }, // Default empty contact info
    });

    // Save the new user
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Profile
const viewProfile = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Profile
const editProfile = async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    const user = await User.findOne({ id: req.user.id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (phone) user.contact.phone = phone;
    if (address) user.contact.address = address;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, viewProfile, editProfile };
