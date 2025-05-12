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
  const [showQrModal, setShowQrModal] = useState(false); // Control QR modal visibility
  const [showModifyModal, setShowModifyModal] = useState(false); // Control Modify modal visibility
  const [modifyBookingId, setModifyBookingId] = useState(null); // Booking ID to modify
  const [formValues, setFormValues] = useState({
    showtime: "",
    seats: "",
    paymentType: "",
    paymentStatus: "",
  });
  const [availableShowtimes, setAvailableShowtimes] = useState([]); // Showtimes for the selected movie
  const [availableSeats, setAvailableSeats] = useState([]); // Seat options

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://cinema-backend:3000/api/bookings/history', { withCredentials: true });
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
      await axios.delete(`http://cinema-backend:3000/api/bookings/${bookingId}/cancel`, { withCredentials: true });
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

  const openModifyModal = async (bookingId) => {
    setModifyBookingId(bookingId);
    const booking = bookings.find((b) => b._id === bookingId);
    if (!booking) return;
  
    try {
      // Fetch movie details including showtimes
      const response = await axios.get(`http://cinema-backend:3000/api/movies/${booking.movie._id}`, {
        withCredentials: true,
      });
  
      // Get the movie showtimes directly from the response
      const movieShowtimes = response.data.showtimes || [];
  
      // Populate available seats (A1-A10, B1-B10)
      const seats = [];
      ['A', 'B'].forEach((row) => {
        for (let i = 1; i <= 10; i++) {
          seats.push(`${row}${i}`);
        }
      });
  
      // Set available showtimes and seats
      setAvailableShowtimes(movieShowtimes);
      setAvailableSeats(seats);
  
      // Pre-fill form values with existing booking data
      setFormValues({
        showtime: booking.showtime,
        seats: booking.seats.join(", "),
        paymentType: booking.payment.type,
        paymentStatus: booking.payment.status,
      });
  
      // Show the modify modal
      setShowModifyModal(true);
    } catch (err) {
      alert('Error fetching movie details. Please try again.');
    }
  };

  const handleModifyChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "seats") {
      const selectedSeats = Array.from(e.target.selectedOptions, option => option.value);
      setFormValues({ ...formValues, [name]: selectedSeats.join(", ") });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  

  const submitModifyBooking = async () => {
    try {
      const { showtime, seats, paymentType, paymentStatus } = formValues;
      const updatedBooking = {
        showtime,
        seats: seats.split(",").map((seat) => seat.trim()), // Split seats into an array
        payment: { type: paymentType, status: paymentStatus },
      };
  
      const response = await axios.put(
        `http://cinema-backend:3000/api/bookings/${modifyBookingId}/modify`,
        updatedBooking,
        { withCredentials: true }
      );
      
      // Ensure movie details are retained by using the original booking's movie
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === modifyBookingId
            ? { ...response.data.booking, movie: booking.movie }  // Retain the movie details
            : booking
        )
      );
  
      setShowModifyModal(false);
      alert("Booking modified successfully!");
    } catch (error) {
      alert("Error modifying booking. Please try again.");
    }
  };
  

  const closeModifyModal = () => {
    setShowModifyModal(false);
    setModifyBookingId(null);
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
                      onClick={() => openModifyModal(booking._id)}
                      className="bg-red-700 py-2 px-6 hover:bg-red-900 text-white"
                    >
                      Modify Booking
                    </button>
                    <button
                      onClick={() => {
                        setQrBookingId(booking._id);
                        setShowQrModal(true);
                      }}
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
      {showQrModal && qrBookingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Your E-Ticket QR Code</h2>
            <div className="flex justify-center mb-4">
              <QRCode value={JSON.stringify({ bookingId: qrBookingId, movie: bookings.find(b => b._id === qrBookingId)?.movie })} />
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="bg-red-700 py-2 px-6 w-full text-white hover:bg-red-900 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Modify Booking */}
      {showModifyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Modify Booking</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Showtime</label>
                <select
                  name="showtime"
                  value={formValues.showtime}
                  onChange={handleModifyChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Showtime</option>
                  {availableShowtimes.map((time) => (
                    <option key={time} value={time}>
                      {new Date(time).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Seats</label>
                <select
                  name="seats"
                  value={formValues.seats.split(", ").map(seat => seat.trim())} // Split selected seats and pass as an array to match `multiple` behavior
                  onChange={handleModifyChange}
                  className="w-full p-2 border rounded-lg"
                  multiple
                >
                  {availableSeats.map((seat) => (
                    <option key={seat} value={seat}>
                      {seat}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Hold down "Ctrl" (Windows) or "Cmd" (Mac) to select multiple seats.
                </p>
                <div className="mt-2">
                  <p className="text-sm text-white">
                    <strong>Selected Seats: </strong>{formValues.seats}
                  </p>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2">Payment Type</label>
                <select
                  name="paymentType"
                  value={formValues.paymentType}
                  onChange={handleModifyChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Payment Type</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Payment Status</label>
                <select
                  name="paymentStatus"
                  value={formValues.paymentStatus}
                  onChange={handleModifyChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Payment Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </form>
            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={submitModifyBooking}
                className="bg-red-700 py-2 px-6 w-full text-white hover:bg-red-900 rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={closeModifyModal}
                className="bg-gray-500 py-2 px-6 w-full text-white hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
