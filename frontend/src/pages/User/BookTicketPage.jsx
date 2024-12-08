import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

export const BookTicketPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState("");
  const [seats, setSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending"); // Default status is pending
  const ticketPrice = 1200; // Price per ticket in PKR

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
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
    const currentDate = new Date();
  
    // Convert selected showtime (e.g., '1:00 PM') to 24-hour format
    const [time, period] = showtime.split(' '); // e.g., ['1:00', 'PM']
    const [hours, minutes] = time.split(':');  // e.g., ['1', '00']
  
    let hours24 = parseInt(hours);
  
    // Adjust hours based on AM/PM period
    if (period === 'PM' && hours24 !== 12) {
        hours24 += 12; // Convert PM to 24-hour format
    } else if (period === 'AM' && hours24 === 12) {
        hours24 = 0; // Midnight case (12 AM -> 00)
    }
  
    // Set the current date's time to the selected showtime
    const formattedShowtime = new Date(currentDate.setHours(hours24, parseInt(minutes), 0, 0)).toISOString();
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookings/book",
        { 
          movieId: movieId,  // Movie is the expected key, not movieId
          showtime: formattedShowtime,  // Use the formatted showtime here
          seats, 
          payment: { 
            amount: seats.length * ticketPrice, 
            status: paymentStatus, 
            type: paymentMethod 
          } 
        },
        { withCredentials: true }
      );
      
      if (response.data.error) {
        // Check if the error is related to unavailable seats
        if (response.data.error.includes('already booked')) {
          alert(response.data.message || "Some of the selected seats are already booked. Please select different seats.");
        } else {
          alert(response.data.message || "An error occurred during booking.");
        }
      } else {
        alert(response.data.message || "Booking successful!");
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
    "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"
  ];

  return (
    <div className="p-8 font-poppins text-white">
      <Navbar userName="" />
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
                value={showtime}
                onChange={(e) => setShowtime(e.target.value)}
                className="block w-full mt-2 p-2 border border-gray-400 bg-transparent text-white rounded focus:outline-none focus:border-red-500"
              >
                <option value="" className="text-gray-400">Choose a showtime</option>
                <option value="1:00 PM" className="text-black">Afternoon - 1:00 PM</option>
                <option value="9:00 PM" className="text-black">Night - 9:00 PM</option>
              </select>
            </div>

            {/* Seats Selector */}
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
  );
};
