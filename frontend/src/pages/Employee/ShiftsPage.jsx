import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/NavbarEmployee';

export const ShiftsPage = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShift, setSelectedShift] = useState(null);
  const [shiftChangeRequest, setShiftChangeRequest] = useState('');
  const [shiftChangeSuccess, setShiftChangeSuccess] = useState('');

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/shift-management/shifts');
        setShifts(response.data.shifts);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  const handleRequestShiftChange = async (shiftId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/shift-management/shifts/request-change', {
        shiftId,
        requestedShift: shiftChangeRequest,
      });
      setShiftChangeSuccess(response.data.message);
      setShiftChangeRequest('');
      setTimeout(() => setShiftChangeSuccess(''), 3000);
    } catch (error) {
      console.error('Error requesting shift change:', error);
      alert('Unable to request shift change');
    }
  };

  const handleViewShiftDetails = async (shiftId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/shift-management/shifts/${shiftId}`);
      setSelectedShift(response.data.shift);
    } catch (error) {
      console.error('Error fetching shift details:', error);
      alert('Unable to fetch shift details');
    }
  };

  const closeModal = () => {
    setSelectedShift(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-black to-red-950 text-white">
      {/* Navbar */}
      <Navbar userName="Employee" />

      {/* Main Content */}
      <div className="p-8 flex-grow">
        <div className="container mx-auto outline outline-red-500 bg-black shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-red-500 text-center">Assigned Shifts</h1>

          {/* All Shifts Section */}
          <table className="w-full outline outline-white table-auto text-left bg-gradient-to-br from-black to-red-950 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gradient-to-br from-black to-red-950 text-red-400">
              <tr>
                <th className="px-6 py-3">Shift ID</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Shift Type</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift._id} className="border-b border-white hover:bg-gray-800">
                  <td className="px-6 py-3">{shift._id}</td>
                  <td className="px-6 py-3">{new Date(shift.date).toLocaleString()}</td>
                  <td className="px-6 py-3">{shift.shift}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleViewShiftDetails(shift._id)}
                      className="text-blue-400 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shift Details Modal */}
      {selectedShift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-6 rounded-lg w-1/3">
          
            <h2 className="text-2xl font-bold mb-4">Shift Details</h2>
            <div className="space-y-4">
              <p><strong>Shift Type:</strong> {selectedShift.shift}</p>
              <p><strong>Date:</strong> {new Date(selectedShift.date).toLocaleString()}</p>
              <p><strong>Assigned Employee:</strong> {selectedShift.employeeId?.name || 'N/A'}</p>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>

              {/* Request Shift Change */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Request Shift Change</h3>
                <select
                  value={shiftChangeRequest}
                  onChange={(e) => setShiftChangeRequest(e.target.value)}
                  className="p-2 mr-4 rounded bg-black text-white border border-red-500 mb-4"
                >
                  <option value="">Select New Shift</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
                <button
                  onClick={() => handleRequestShiftChange(selectedShift._id)}
                  className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                >
                  Request Change
                </button>
              </div>

              {/* Success Message */}
              {shiftChangeSuccess && (
                <div className="mt-4 text-green-400">
                  {shiftChangeSuccess}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
