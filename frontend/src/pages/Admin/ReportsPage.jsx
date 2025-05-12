import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample booking data (replace with real data or API calls)
const sampleData = {
  daily: [
    { date: '2024-12-01', bookings: 12 },
    { date: '2024-12-02', bookings: 18 },
    { date: '2024-12-03', bookings: 23 },
  ],
  weekly: [
    { date: 'Week 1', bookings: 56 },
    { date: 'Week 2', bookings: 74 },
    { date: 'Week 3', bookings: 89 },
  ],
  monthly: [
    { date: 'November 2024', bookings: 300 },
    { date: 'December 2024', bookings: 250 },
  ],
};

const ReportsPageAdmin = () => {
  const [reportPeriod, setReportPeriod] = useState('daily'); // Default to daily
  const [reportData, setReportData] = useState(sampleData.daily);

  // Handle period change (Daily/Weekly/Monthly)
  const handlePeriodChange = (e) => {
    const selectedPeriod = e.target.value;
    setReportPeriod(selectedPeriod);
    setReportData(sampleData[selectedPeriod]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/notification-background.jpg')" }}></div>

      {/* Navigation Link */}
      <div className="absolute top-4 left-4">
        <Link to="/admin-dashboard" className="text-white font-bold text-xl">
          ← Back to Dashboard
        </Link></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Booking Reports</h1>
        <p className="text-white text-lg mt-2">Visualize Booking Data</p>
      </div>

      {/* Report Period Selector */}
      <div className="relative z-10 mb-6">
        <select
          value={reportPeriod}
          onChange={handlePeriodChange}
          className="p-2 text-black"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Booking Data Table */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg mb-10">
        <table className="min-w-full table-auto text-white">
          <thead>
            <tr className="bg-red-800">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((data, index) => (
              <tr key={index} className="hover:bg-red-700 transition">
                <td className="py-3 px-6">{data.date}</td>
                <td className="py-3 px-6">{data.bookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Option Placeholder */}
      <div className="relative z-10 text-center mb-10">
        {/* In a real implementation, you could enable export options here */}
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-4">
          Export to CSV
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition">
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default ReportsPageAdmin;
