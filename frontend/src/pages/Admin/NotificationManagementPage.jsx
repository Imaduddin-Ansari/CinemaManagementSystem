import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationManagementPage = () => {
  // Notification types
  const notificationTypes = ['Reminder', 'Warning', 'Announcement'];

  // Sample sent notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Reminder', message: 'Meeting at 10 AM tomorrow.', status: 'Sent' },
    { id: 2, type: 'Announcement', message: 'Company event on Friday.', status: 'Sent' },
  ]);

  // New notification form state
  const [selectedType, setSelectedType] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Email');

  // Handle sending notification
  const handleSendNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: selectedType,
      message: message,
      status: 'Sent',
    };
    setNotifications([...notifications, newNotification]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/notification-background.jpg')" }}></div>

      {/* Navigation Link */}
      <div className="absolute top-4 left-4">
       <Link to="/admin-dashboard" className="text-white font-bold text-xl">
          ← Back to Dashboard
        </Link>
        </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Notification Management</h1>
        <p className="text-white text-lg mt-2">Send Alerts and Manage Notifications</p>
      </div>

      {/* New Notification Section */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg mb-10">
        <h2 className="text-white text-2xl font-semibold mb-4">Create New Notification</h2>
        
        <div className="mb-4">
          <label className="text-white">Select Notification Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
            required
          >
            <option value="">Select Type</option>
            {notificationTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-white">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
            placeholder="Write your message here"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-white">Delivery Method</label>
          <div className="flex space-x-4 mt-2">
            <div>
              <input
                type="radio"
                id="email"
                name="deliveryMethod"
                value="Email"
                checked={deliveryMethod === 'Email'}
                onChange={() => setDeliveryMethod('Email')}
              />
              <label htmlFor="email" className="text-white">Email</label>
            </div>
            <div>
              <input
                type="radio"
                id="sms"
                name="deliveryMethod"
                value="SMS"
                checked={deliveryMethod === 'SMS'}
                onChange={() => setDeliveryMethod('SMS')}
              />
              <label htmlFor="sms" className="text-white">SMS</label>
            </div>
          </div>
        </div>

        <button
          onClick={handleSendNotification}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Send Notification
        </button>
      </div>

      {/* Sent Notifications History */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-4">Sent Notifications</h2>

        <table className="w-full text-left text-white">
          <thead className="bg-red-800">
            <tr>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Message</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id} className="hover:bg-red-700 transition">
                <td className="py-2 px-4">{notification.type}</td>
                <td className="py-2 px-4">{notification.message}</td>
                <td className="py-2 px-4">{notification.status}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="text-yellow-400 hover:text-yellow-300 font-semibold mr-4"
                    onClick={() => console.log(`View notification ${notification.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400 font-semibold"
                    onClick={() => setNotifications(notifications.filter(n => n.id !== notification.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to Navigate to Send Notifications to Employees Page */}
      <div className="text-center mt-6">
        <Link to="/SendToSpecificEmployeesPage" classname="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Send Notifications to Specific Employees
        </Link>
      </div>
    </div>
  );
};

export default NotificationManagementPage;
