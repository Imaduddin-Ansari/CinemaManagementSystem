// src/pages/Dashboard/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Updated features array including Notification Management link
  const features = [
    {
      title: 'Manage Movies',
      description: 'Add, edit, and delete movies in the system.',
      icon: '🎥',
      path: '/movies',
    },
    {
      title: 'Manage Employees',
      description: 'View and manage employee information.',
      icon: '👨‍💼',
      path: '/employees',  // Link to Employee Management page
    },
    {
      title: 'Notifications',
      description: 'Send and manage notifications.',
      icon: '🔔',
      path: '/notifications', // Link to Notification Management page
    },
    {
      title: 'Reports',
      description: 'View detailed analytics and reports.',
      icon: '📊',
      path: '/reports',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Hero Section */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}></div>
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-5xl font-extrabold">Welcome to CineMovie</h1>
        <p className="text-white text-lg mt-2">Your admin hub for seamless management</p>
      </div>

      {/* Features Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] max-w-[1000px]">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(feature.path)}
            className="bg-black bg-opacity-80 rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="text-red-500 text-4xl">{feature.icon}</div>
              <div>
                <h2 className="text-white text-2xl font-semibold">{feature.title}</h2>
                <p className="text-gray-400 mt-2">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
