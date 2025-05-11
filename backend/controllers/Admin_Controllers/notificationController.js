const NotificationAdmin = require('../../models/AdminModel/Movie');  // Change to NotificationAdmin
const nodemailerAdmin = require('../../models/AdminModel/Movie');   // Change to nodemailerAdmin

// Add a new notification
exports.addNotification = async (req, res) => {
  try {
    const notification = new NotificationAdmin(req.body);  // Changed Notification to NotificationAdmin
    const savedNotification = await notification.save();

    // Simulate sending notifications (e.g., via email)
    savedNotification.recipients.forEach(async (recipient) => {
      try {
        const transporter = nodemailerAdmin.createTransport({  // Changed nodemailer to nodemailerAdmin
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
    const notifications = await NotificationAdmin.find();  // Changed Notification to NotificationAdmin
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
};
