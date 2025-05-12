const AdminAdmin = require('../../models/AdminModel/Movie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminAdmin.findOne({ email });  // Changed Admin to AdminAdmin
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await AdminAdmin.findOne({ email });  // Changed Admin to AdminAdmin
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await admin.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/admin/reset-password/${resetToken}`;
    await sendEmail({ email, subject: 'Password Reset', message: `Reset your password here: ${resetUrl}` });

    res.status(200).json({ message: 'Reset link sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const admin = await AdminAdmin.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });  // Changed Admin to AdminAdmin

    if (!admin) return res.status(400).json({ message: 'Invalid or expired token' });

    admin.password = password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;
    await admin.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
