import React, { useState } from 'react';

// Sample data for employees (this would typically come from a backend)
const sampleEmployees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
  { id: 4, name: 'Alice Williams' },
];

const SendToSpecificEmployeesPage = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [notificationType, setNotificationType] = useState('SMS'); // Default to SMS
  const [message, setMessage] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);

  // Handle multi-select for employees
  const handleEmployeeSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedEmployees(selectedOptions);
  };

  // Handle sending notification
  const handleSendNotification = () => {
    if (!message) {
      alert('Please enter a message');
      return;
    }

    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee');
      return;
    }

    // Logic to send notification (e.g., API call)
    console.log(`Sending ${notificationType} notification to:`, selectedEmployees);
    console.log('Message:', message);

    // After sending, update the state
    setNotificationSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/notification-background.jpg')" }}></div>

      {/* Navigation Links */}
      <div className="absolute top-4 left-4">
        <a href="/notifications" className="text-white font-bold text-xl mr-4">← Back to Notification Management</a>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Send Notifications to Specific Employees</h1>
        <p className="text-white text-lg mt-2">Select employees and send notifications</p>
      </div>

      {/* Notification Form */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
        <div className="mb-4">
          <label htmlFor="notification-type" className="text-white font-semibold">Notification Type</label>
          <select
            id="notification-type"
            className="w-full mt-2 p-2 text-white bg-black border border-gray-600 rounded"
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
          >
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
          </select>
        </div>

        {/* Employee Selection */}
        <div className="mb-4">
          <label htmlFor="employees" className="text-white font-semibold">Select Employees</label>
          <select
            id="employees"
            multiple
            className="w-full mt-2 p-2 text-white bg-black border border-gray-600 rounded"
            value={selectedEmployees}
            onChange={handleEmployeeSelect}
          >
            {sampleEmployees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label htmlFor="message" className="text-white font-semibold">Message</label>
          <textarea
            id="message"
            className="w-full mt-2 p-2 text-white bg-black border border-gray-600 rounded"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Send Notification Button */}
        <div className="text-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            onClick={handleSendNotification}
          >
            Send Notification
          </button>
        </div>

        {/* Success Message */}
        {notificationSent && (
          <div className="mt-4 text-green-500 text-center font-semibold">
            Notification sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default SendToSpecificEmployeesPage;
