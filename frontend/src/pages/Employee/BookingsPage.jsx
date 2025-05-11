import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../../components/NavbarEmployee";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentType, setPaymentType] = useState("Credit Card");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [showUpdateBookingModal, setShowUpdateBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [ticketData, setTicketData] = useState(null); // To store ticket data
const [showTicketPopup, setShowTicketPopup] = useState(false); // To control popup visibility


  useEffect(() => {
    fetchBookings();
    fetchMovies();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/bookings");
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      setLoadingMovies(true);
      const response = await axios.get("http://localhost:3000/api/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoadingMovies(false);
    }
  };

  const handleMovieSelect = (movieId) => {
    const movie = movies.find((m) => m._id === movieId);
    setSelectedMovie(movieId);
    setShowtimes(movie?.showtimes || []);
    setSelectedShowtime("");
    setAvailableSeats([]);
    setSelectedSeats([]);
  };

  const handleShowtimeSelect = async (showtime) => {
    setSelectedShowtime(showtime);

    try {
      const response = await axios.post("http://localhost:3000/employee/check-available-seats", {
        movieId: selectedMovie,
        showtime,
      });

      setAvailableSeats(response.data.availableSeats);
    } catch (error) {
      console.error("Error fetching available seats:", error);
    }
  };

  const handleAddBooking = async () => {
    if (!userEmail || !selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/employee/bookings/addbooking", {
        email: userEmail,
        movieId: selectedMovie,
        showtime: selectedShowtime,
        seats: selectedSeats,
        paymentType,
      });

      fetchBookings();
      setError("");
      setShowAddBookingModal(false);
      alert("Booking added successfully!");
    } catch (error) {
      console.error("Error adding booking:", error);
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  const handleUpdateBooking = async () => {
    if (!selectedBooking || !selectedBooking.seats.length) {
      setError("Please select new seats or showtime.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/employee/bookings/${selectedBooking._id}`, {
        seats: selectedBooking.seats,
        showtime: selectedBooking.showtime,
        status: selectedBooking.status,
      });

      fetchBookings();
      setShowUpdateBookingModal(false);
      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  const handlePrintTicket = async (bookingId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/employee/bookings/print/${bookingId}`
      );
      alert(response.data.message);
      setTicketData(response.data.ticket); // Store ticket data to show in the popup
      console.log(response.data.ticket);
      setShowTicketPopup(true); // Show the ticket popup
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, printed: true } : booking
        )
      );
    } catch (error) {
      console.error("Error printing ticket:", error);
      alert("Unable to print ticket");
    }
  };
  

  // Define the fetchAvailableSeats function here
  const fetchAvailableSeats = async (movieId, showtime) => {
    try {
      const response = await axios.post("http://localhost:3000/employee/check-available-seats", {
        movieId,
        showtime,
      });
      setAvailableSeats(response.data.availableSeats);
    } catch (error) {
      console.error("Error fetching available seats:", error);
    }
  };

  const openUpdateBookingModal = async (booking) => {
    console.log("Selected Booking:", booking); // Log the entire booking object
    
    const movie = movies.find((m) => m._id === booking.movie._id); // Access movie._id here
    if (movie) {
      console.log("Movie found:", movie);
      setShowtimes(movie.showtimes || []);
      setSelectedShowtime(booking.showtime);
      await fetchAvailableSeats(movie._id, booking.showtime); // Fetch available seats for the selected movie and showtime
    } else {
      console.log("Movie not found");
      setShowtimes([]);
    }
    setSelectedBooking(booking); // Ensure the selected booking is set
    setShowUpdateBookingModal(true);
  };
  

  const closeModal = () => {
    setShowAddBookingModal(false);
    setShowUpdateBookingModal(false);
    setError("");
  };

  if (loadingMovies) {
    return <div>Loading movies...</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-black to-red-950 text-white">
      <Navbar userName="Employee" />

      <div className="p-8 flex-grow">
        <div className="container outline outline-red-500 mx-auto bg-black shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-red-500 text-center">Bookings</h1>

          <button
            onClick={() => setShowAddBookingModal(true)}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 mb-6"
          >
            Add New Booking
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Bookings for Today</h2>
            <div>
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-gradient-to-br from-black to-red-950 outline outline-white p-4 mb-4 rounded-md">
                  <h3 className="text-lg font-semibold">{booking.movie?.title || "No movie title"}</h3>
                  <p className="text-sm">Showtime: {new Date(booking.showtime).toLocaleString()}</p>
                  <p className="text-sm">Seats: {booking.seats.join(", ")}</p>
                  <p className="text-sm">Status: {booking.status}</p>
                  <div className="mt-2">
                    {booking.printed ? (
                      <button
                        disabled
                        className="bg-gray-400 px-4 py-2 rounded cursor-not-allowed"
                      >
                        Ticket Printed
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePrintTicket(booking._id)}
                        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                      >
                        Print Ticket
                      </button>
                    )}
                    <button
                      onClick={() => openUpdateBookingModal(booking)}
                      className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 ml-2"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddBookingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Add New Booking</h2>
            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-4">
              <label className="block mb-2">User Email:</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter user email"
                className="w-full p-2 rounded bg-black text-white border border-red-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">Movie:</label>
                <select
                  value={selectedMovie}
                  onChange={(e) => handleMovieSelect(e.target.value)}
                  className="w-full p-2 rounded bg-black text-white border border-red-500"
                >
                  <option value="">Select a movie</option>
                  {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Showtime:</label>
                <select
                  value={selectedShowtime}
                  onChange={(e) => handleShowtimeSelect(e.target.value)}
                  disabled={!showtimes.length}
                  className="w-full p-2 rounded bg-black text-white border border-red-500"
                >
                  <option value="">Select a showtime</option>
                  {showtimes.map((showtime) => (
                    <option key={showtime} value={showtime}>
                      {new Date(showtime).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Seats:</label>
              <select
                multiple
                value={selectedSeats}
                onChange={(e) => setSelectedSeats(Array.from(e.target.selectedOptions, option => option.value))}
                disabled={!availableSeats.length}
                className="w-full p-2 rounded bg-black text-white border border-red-500"
              >
                {availableSeats.map((seat) => (
                  <option key={seat} value={seat}>
                    {seat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Payment Type:</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-2 rounded bg-black text-white border border-red-500"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleAddBooking}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              >
                Add Booking
              </button>
              <button
                onClick={closeModal}
                className="ml-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Booking Modal */}
     {/* Update Booking Modal */}
{showUpdateBookingModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-black p-6 rounded-lg max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">Update Booking</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2">Showtime:</label>
        <select
          value={selectedShowtime}
          onChange={(e) => {
            setSelectedShowtime(e.target.value);
            handleShowtimeSelect(e.target.value); // Fetch available seats when showtime is changed
          }}
          className="w-full p-2 rounded bg-black text-white border border-red-500"
        >
          <option value="">Select a showtime</option>
          {showtimes.map((showtime) => (
            <option key={showtime} value={showtime}>
              {new Date(showtime).toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Seats:</label>
        <select
          multiple
          value={selectedBooking.seats}
          onChange={(e) =>
            setSelectedBooking({
              ...selectedBooking,
              seats: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
          className="w-full p-2 rounded bg-black text-white border border-red-500"
        >
          {availableSeats.map((seat) => (
            <option key={seat} value={seat}>
              {seat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdateBooking}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Update Booking
        </button>
        <button
          onClick={closeModal}
          className="ml-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{showTicketPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-black p-6 rounded-lg max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">Ticket Details</h2>
      {ticketData && (
        <div>
          <p className="text-lg">User ID: {ticketData.userId}</p>
          <p className="text-lg">Issue Date: {ticketData.issueDate}</p>
          <p className="text-lg">Seats: {ticketData.seatNumbers.join(", ")}</p>
        </div>
      )}
      <div className="flex justify-end">
        <button
          onClick={() => setShowTicketPopup(false)}
          className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};