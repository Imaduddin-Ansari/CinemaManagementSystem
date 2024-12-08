import React, { useState, useEffect } from 'react';
import { Navbar } from "../../components/Navbar";
import axios from 'axios';
import QRCode from 'react-qr-code';

export const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [qrBookingId, setQrBookingId] = useState(null); // Booking ID for QR code
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/bookings/history', { withCredentials: true });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Unable to fetch your booking history.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3000/api/bookings/${bookingId}/cancel`, { withCredentials: true });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
    } catch (err) {
      alert('Error cancelling booking. Please try again.');
    }
  };

  const modifyBooking = async (bookingId) => {
    alert('Modify booking functionality is under construction.');
  };

  const getETicket = (bookingId) => {
    setQrBookingId(bookingId); // Set the booking ID
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setQrBookingId(null); // Clear the QR booking ID
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center relative overflow-hidden '>
      <Navbar userName="" onSearch={handleSearch} />
      <div className="absolute top-24 p-8 font-poppins text-white w-full">
        <h1 className="text-4xl font-semibold text-white mb-8 text-center">My Bookings</h1>

        {loading ? (
          <p className="text-5xl text-center text-white">Loading your bookings...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-6 max-h-[500px] overflow-y-auto">
            {bookings.length === 0 ? (
              <p className="text-center text-white">No bookings found.</p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-6 relative"
                >
                  <span
                    className={`absolute top-4 right-4 px-4 py-2 text-white font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                  </span>

                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={booking.movie.posterUrl}
                      alt={booking.movie.title}
                      className="w-32 h-48 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <h2 className="text-2xl font-semibold text-red-700">{booking.movie.title}</h2>
                      <p className="text-white">{new Date(booking.showtime).toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-400"><strong>Seats: </strong><span className="text-white">{booking.seats.join(', ')}</span></p>
                  <p className="text-lg text-gray-400"><strong>Payment Status: </strong><span className="text-white">{booking.payment.status}</span></p>
                  <p className="text-lg text-gray-400"><strong>Total Amount: </strong><span className="text-white">{booking.payment.amount} PKR</span></p>

                  <div className="mt-4 flex justify-between gap-4">
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="bg-red-700 py-2 px-6 hover:bg-red-900 text-white"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => modifyBooking(booking._id)}
                      className="bg-red-700 py-2 px-6 hover:bg-red-900 text-white"
                    >
                      Modify Booking
                    </button>
                    <button
                      onClick={() => getETicket(booking._id)}
                      className="bg-red-700 py-2 px-6 hover:bg-red-900 text-white"
                    >
                      Get E-Ticket
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal for QR Code */}
      {showModal && qrBookingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Your E-Ticket QR Code</h2>
            <div className="flex justify-center mb-4">
              <QRCode value={JSON.stringify({ bookingId: qrBookingId, movie: bookings.find(b => b._id === qrBookingId)?.movie })} />
            </div>
            <button
              onClick={closeModal}
              className="bg-red-700 py-2 px-6 w-full text-white hover:bg-red-900 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
