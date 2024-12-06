const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

// Add a new notification
exports.addNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();

    // Simulate sending notifications (e.g., via email)
    savedNotification.recipients.forEach(async (recipient) => {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: recipient,
          subject: 'Cinema Notification',
          text: req.body.message,
        });

        notification.status = 'Sent';
        await notification.save();
      } catch {
        notification.status = 'Failed';
      }
    });

    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add notification', error: err.message });
  }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
};



// const { sendSMS, sendEmail } = require('../utils/notificationService');
// const User = require('../models/User');

// exports.sendNotification = async (req, res) => {
//   const { type, message, recipients } = req.body; // 'booking', 'marketing'
//   try {
//     const users = await User.find({ _id: { $in: recipients } });
//     const promises = users.map(user => {
//       if (type === 'booking') return sendSMS(user.contact.phone, message);
//       if (type === 'marketing') return sendEmail(user.email, 'Marketing Update', message);
//     });
//     await Promise.all(promises);
//     res.status(200).json({ message: 'Notifications sent successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
