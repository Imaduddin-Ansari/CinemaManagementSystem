import React, { useState, useEffect } from 'react';
import { Navbar } from "../../components/Navbar";
import axios from 'axios';

export const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user's booking history
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

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    try {
      // Make the API call to cancel the booking
      const response = await axios.delete(`http://localhost:3000/api/bookings/${bookingId}/cancel`, { withCredentials: true });
      
      // Update the state with the canceled booking status
      setBookings(prevBookings =>
        prevBookings.map(booking => 
          booking._id === bookingId
            ? { ...booking, status: 'cancelled' }  // Change status to 'cancelled'
            : booking
        )
      );
    } catch (err) {
      alert('Error cancelling booking. Please try again.');
    }
  };

  // Modify a booking (example for modifying seats)
  const modifyBooking = async (bookingId) => {
    // You can implement a modal or a form to modify the booking here
    alert('Modify booking functionality is under construction.');
  };

  // Generate e-Ticket
  const getETicket = (bookingId) => {
    const booking = bookings.find((booking) => booking._id === bookingId);
    if (booking) {
      alert(`e-Ticket generated for Booking ID: ${bookingId}`);
      // You can redirect to a page where users can view/download their e-ticket
      // For example:
      // window.location.href = `/download-e-ticket/${bookingId}`;
    }
  };

  return (
    <>
      <Navbar userName="" />
      <div className="absolute top-24 p-8 font-poppins text-white w-full">
        <h1 className="text-4xl font-semibold text-white mb-8 text-center">My Bookings</h1>

        {loading ? (
          <p className="text-center text-white">Loading your bookings...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-6 max-h-[500px] overflow-y-auto"> {/* Added scrollable area */}
            {bookings.length === 0 ? (
              <p className="text-center text-white">No bookings found.</p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-6 relative" // Added relative position here
                >
                  {/* Status Badge - Positioned at the top-right corner */}
                  <span
                    className={`absolute top-4 right-4 px-4 py-2 text-white font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                  </span>

                  <div className="flex items-center justify-between mb-4">
                    {/* Movie Poster */}
                    <img
                      src={booking.movie.posterUrl}
                      alt={booking.movie.title}
                      className="w-32 h-48 object-cover rounded-lg"
                    />

                    {/* Movie Title and Showtime */}
                    <div className="ml-6 flex-1">
                      <h2 className="text-2xl font-semibold text-red-700">{booking.movie.title}</h2>
                      <p className="text-white">{new Date(booking.showtime).toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-400"><strong>Seats : </strong>
                  <span className="text-white">
                   {booking.seats.join(', ')}
                  </span>
                  </p>
                  <p className="text-lg text-gray-400"><strong>Payment Status : </strong>
                  <span className="text-white">
                  {booking.payment.status}
                  </span>
                   </p>
                  <p className="text-lg text-gray-400"><strong>Total Amount : </strong>
                  <span className="text-white">
                  {booking.payment.amount} PKR
                  </span>
                   </p>

                  <div className="mt-4 flex justify-between gap-4">
                    {/* Cancel Booking Button */}
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="bg-red-700 py-2 px-6 hover:bg-red-900 text-white"
                    >
                      Cancel Booking
                    </button>

                    {/* Modify Booking Button */}
                    <button
                      onClick={() => modifyBooking(booking._id)}
                      className="bg-red-700 py-2 px-6 hover:bg-red-900 text-white"
                    >
                      Modify Booking
                    </button>

                    {/* Get E-Ticket Button */}
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
    </>
  );
};
