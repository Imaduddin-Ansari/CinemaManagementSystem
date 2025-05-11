import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const BookTicketPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]); // For dynamic showtimes
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [seats, setSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending"); // Default status is pending
  const ticketPrice = 1200; // Price per ticket in PKR
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
        setShowtimes(response.data.showtimes || []); // Assume `showtimes` is part of the movie data
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error.message);
      });
  }, [movieId]);

  const handleSeatSelection = (e) => {
    const seat = e.target.value;
    if (e.target.checked) {
      setSeats((prevSeats) => [...prevSeats, seat]);
    } else {
      setSeats((prevSeats) => prevSeats.filter((s) => s !== seat));
    }
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookings/book",
        {
          movieId,
          showtime: selectedShowtime, // Send the selected showtime
          seats,
          payment: {
            amount: seats.length * ticketPrice,
            status: paymentStatus,
            type: paymentMethod,
          },
        },
        { withCredentials: true }
      );

      if (response.data.error) {
        // Handle errors like unavailable seats
        alert(response.data.message || "An error occurred during booking.");
      } else {
        alert(response.data.message || "Booking successful!");
        navigate("/user-dashboard"); // Redirect after successful booking
      }
    } catch (error) {
      console.error("Error booking movie:", error.message);
      alert(error.response?.data?.message || "An error occurred while booking the movie");
    }
  };

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  const seatOptions = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
    "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center relative overflow-hidden '>
    <div className="p-8 font-poppins text-white">
      <Navbar userName="" onSearch={handleSearch}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 bg-black p-10">
        {/* Left Section: Movie Poster */}
        <div>
          <img
            src={movie.posterUrl}
            alt={`${movie.title} Poster`}
            className="w-full max-w-sm mx-auto rounded mb-4"
          />
        </div>

        {/* Middle Section: Movie Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold mb-4 text-red-700">{movie.title}</h1>
          <p className="text-lg">
            <strong className="font-medium text-gray-400">Description:</strong> {movie.description}
          </p>
          <p className="text-lg">
            <strong className="font-medium text-gray-400">Genre:</strong> {movie.genre}
          </p>
          <p className="text-lg">
            <strong className="font-medium text-gray-400">Release Date:</strong> {movie.releaseDate.split("-")[0]}
          </p>
          <p className="text-lg">
            <strong className="font-medium text-gray-400">Rating:</strong> {movie.rating}
          </p>
          <p className="text-lg">
            <strong className="font-medium text-gray-400">Duration:</strong> {movie.duration} minutes
          </p>
        </div>

        {/* Right Section: Booking Inputs */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-red-700">Book Your Tickets</h2>
          <div className="space-y-4">
            <p className="text-lg">
              <strong className="text-gray-400">Price per Ticket:</strong> 1200 PKR
            </p>

            {/* Showtime Selector */}
            <div>
            <label htmlFor="showtime" className="block font-medium text-lg">
              Select Showtime:
            </label>
            <select
              id="showtime"
              value={selectedShowtime}
              onChange={(e) => setSelectedShowtime(e.target.value)}
              className="block w-full mt-2 p-2 border border-gray-400 bg-transparent text-white rounded focus:outline-none focus:border-red-500"
            >
              <option value="" className="text-gray-400">Choose a showtime</option>
              {showtimes.map((time, index) => {
                // Parse the time into a more user-friendly format
                const parsedDate = new Date(time);
                const formattedDate = parsedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                });
                const formattedTime = parsedDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                
                // Combine formatted date and time
                const displayText = `${formattedDate}: ${formattedTime}`;

                return (
                  <option key={time} value={time} className="text-black">
                    {displayText}
                  </option>
                );
              })}
            </select>
          </div>



            {/* Seat Selector */}
            <div>
              <label className="block font-medium text-lg">Select Seats:</label>
              <div className="grid grid-cols-5 gap-4 mt-2">
                {seatOptions.map((seat) => (
                  <div key={seat}>
                    <label className="block text-gray-400">
                      <input
                        type="checkbox"
                        value={seat}
                        onChange={handleSeatSelection}
                        className="mr-2"
                      />
                      {seat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-lg">
              <strong className="text-gray-400">Total Price:</strong> {seats.length * ticketPrice} PKR
            </p>

            {/* Payment Method Selector */}
            <div>
              <label htmlFor="payment" className="block font-medium text-lg">
                Payment Method:
              </label>
              <select
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full mt-2 p-2 border border-gray-400 bg-transparent text-white rounded focus:outline-none focus:border-red-500"
              >
                <option value="" className="text-gray-400 bg-black">Choose a payment method</option>
                <option value="Credit Card" className="text-black bg-white">Credit Card</option>
                <option value="Cash" className="text-black bg-white">Cash</option>
                <option value="Debit Card" className="text-black bg-white">Debit Card</option>
              </select>
            </div>

            {/* Pay Now / Pay Later */}
            <div>
              <label className="block font-medium text-lg">Payment Status:</label>
              <div className="flex gap-4 mt-2">
                <label className="text-gray-400">
                  <input
                    type="radio"
                    name="paymentStatus"
                    value="success"
                    checked={paymentStatus === "success"}
                    onChange={() => setPaymentStatus("success")}
                    className="mr-2"
                  />
                  Pay Now
                </label>
                <label className="text-gray-400">
                  <input
                    type="radio"
                    name="paymentStatus"
                    value="pending"
                    checked={paymentStatus === "pending"}
                    onChange={() => setPaymentStatus("pending")}
                    className="mr-2"
                  />
                  Pay Later
                </label>
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              className="mt-6 bg-red-700 py-2 px-4 rounded w-full text-lg hover:bg-red-900 hover:text-white transition-colors"
            >
              Book Movie
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
