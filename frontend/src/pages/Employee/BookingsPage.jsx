import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(''); // 'update' or 'rebook'
  const [updateForm, setUpdateForm] = useState({ seats: '', showtime: '', status: '' });
  const [rebookForm, setRebookForm] = useState({ newShowtime: '', newSeats: '' });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employee/bookings');
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/bookings/${selectedBooking._id}`,
        updateForm
      );
      alert(response.data.message);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === selectedBooking._id ? response.data.booking : booking
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Unable to update booking');
    }
  };

  const handleRebook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/bookings/${selectedBooking._id}/rebook`,
        rebookForm
      );
      alert(response.data.message);
      setBookings((prev) => [...prev, response.data.booking]);
      closeModal();
    } catch (error) {
      console.error('Error rebooking customer:', error);
      alert('Unable to rebook customer');
    }
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalType('');
    setUpdateForm({ seats: '', showtime: '', status: '' });
    setRebookForm({ newShowtime: '', newSeats: '' });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="w-full bg-gradient-to-br from-black to-red-950 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Bookings Management</h1>

      <table className="w-full table-auto text-left bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-900 text-red-400">
          <tr>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Movie</th>
            <th className="px-6 py-3">Showtime</th>
            <th className="px-6 py-3">Seats</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b border-gray-700 hover:bg-gray-700">
              <td className="px-6 py-3">{booking.user?.name || 'N/A'}</td>
              <td className="px-6 py-3">{booking.movie?.title || 'N/A'}</td>
              <td className="px-6 py-3">{new Date(booking.showtime).toLocaleString()}</td>
              <td className="px-6 py-3">{booking.seats.join(', ')}</td>
              <td className="px-6 py-3">{booking.status}</td>
              <td className="px-6 py-3 space-x-3">
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setModalType('update');
                    setUpdateForm({
                      seats: booking.seats.join(', '),
                      showtime: new Date(booking.showtime).toISOString().slice(0, 16),
                      status: booking.status,
                    });
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setModalType('rebook');
                  }}
                  className="text-green-400 hover:underline"
                >
                  Rebook
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3">
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white absolute top-4 right-4"
            >
              ✖
            </button>
            {modalType === 'update' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Update Booking</h2>
                <form onSubmit={handleUpdateBooking} className="space-y-4">
                  <div>
                    <label htmlFor="seats" className="block text-gray-400">
                      Seats:
                    </label>
                    <input
                      type="text"
                      id="seats"
                      value={updateForm.seats}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, seats: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded bg-gray-900 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="showtime" className="block text-gray-400">
                      Showtime:
                    </label>
                    <input
                      type="datetime-local"
                      id="showtime"
                      value={updateForm.showtime}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, showtime: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded bg-gray-900 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-gray-400">
                      Status:
                    </label>
                    <select
                      id="status"
                      value={updateForm.status}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, status: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded bg-gray-900 text-white"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
            {modalType === 'rebook' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Rebook Customer</h2>
                <form onSubmit={handleRebook} className="space-y-4">
                  <div>
                    <label htmlFor="newShowtime" className="block text-gray-400">
                      New Showtime:
                    </label>
                    <input
                      type="datetime-local"
                      id="newShowtime"
                      value={rebookForm.newShowtime}
                      onChange={(e) =>
                        setRebookForm({ ...rebookForm, newShowtime: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded bg-gray-900 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="newSeats" className="block text-gray-400">
                      New Seats:
                    </label>
                    <input
                      type="text"
                      id="newSeats"
                      value={rebookForm.newSeats}
                      onChange={(e) =>
                        setRebookForm({ ...rebookForm, newSeats: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded bg-gray-900 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
                  >
                    Rebook
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
