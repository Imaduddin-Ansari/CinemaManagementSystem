import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/NavbarEmployee';

export const HomePageEmployee = () => {
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    duties: [],
    alerts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://cinema-backend:3000/employee/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-screen min-h-screen bg-gradient-to-br from-black to-red-950 text-white">
      {/* Navbar */}
      <Navbar userName="Employee" />

      {/* Main Layout with Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 py-4">
        
        {/* Duties Section - Takes the space of two boxes */}
        <div className="col-span-1 lg:col-span-3 bg-black outline outline-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Assigned Shift</h2>
          {dashboardData.duties.length === 0 ? (
            <p className="text-gray-400 text-xl">No duties shift for today.</p>
          ) : (
            <ul className="space-y-6">
              {dashboardData.duties.map((duty) => (
                <li
                  key={duty._id}
                  className="text-xl flex justify-between items-center outline outline-red-500 bg-gradient-to-br from-black to-red-950 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    <p className="font-semibold text-red-400 text-xl">Shift:</p> {duty.shift}
                    <p className="font-semibold text-red-400 text-xl">Status:</p> {duty.status}
                  </div>
                  <p className="text-gray-300 text-xl">
                    Date: {new Date(duty.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bookings Section */}
        <div className="col-span-1 lg:col-span-2 outline outline-white bg-black outline p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Bookings for Today</h2>
          {dashboardData.bookings.length === 0 ? (
            <p className="text-gray-400 text-xl">No bookings for today.</p>
          ) : (
            <ul className="space-y-6">
              {dashboardData.bookings.map((booking) => (
                <li
                  key={booking._id}
                  className="text-xl flex justify-between items-center outline outline-red-500 bg-gradient-to-br from-black to-red-950  p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    <p className="font-semibold text-red-400 text-xl">Movie:</p> {booking.movie.title}
                    <p className="font-semibold text-red-400 text-xl">Seats:</p> {booking.seats.join(', ')}
                  </div>
                  <p className="text-gray-300">
                    Showtime: {new Date(booking.showtime).toLocaleTimeString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Alerts Section */}
        <div className="col-span-1 lg:col-span-1 outline outline-white bg-black p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Notifications</h2>
          {dashboardData.alerts.length === 0 ? (
            <p className="text-gray-400 text-xl">No notifications available.</p>
          ) : (
            <ul className="space-y-6">
              {dashboardData.alerts.map((alert) => (
                <li
                  key={alert._id}
                  className="text-xl outline outline-red-500 bg-gradient-to-br from-black to-red-950 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <p>{alert.message}</p>
                  <p className="text-gray-300 text-xl">
                    Date: {new Date(alert.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

