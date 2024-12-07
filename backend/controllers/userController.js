const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({success:false,message:"Email already registered",error: 'Email already registered' });

    if(!email||!password||!name)
    {
      return res.status(400).json({success:false,message:"All Fields Are Required"})
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user', // Default role
      contact: { phone: '', address: '' }, // Default empty contact info
    });

    // Save the new user
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    if(!email||!password)
      {
        return res.status(400).json({success:false,message:"All Fields Are Required"})
      }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({success:false,message:"User not found", error: 'User not found'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({success:false,message:"Invalid credentials", error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutUser=async(req,res)=>{
  try {
    res.clearCookie('token');
    res.status(200).json({success:true,message:"Logged Out Successfully"});
  } catch(error)
  {
    console.log("Error in Logout Controller",error.message);
    rest.status(500).json({success:false,message:"Internal server error"});
  }
}

// View Profile
const viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
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
    const user = await User.findById(req.user.id);
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


module.exports = { registerUser, loginUser, logoutUser, viewProfile, editProfile };
