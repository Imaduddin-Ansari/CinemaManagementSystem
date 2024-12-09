import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link for navigation

const ShowManagementPage = () => {
  // Sample movie showtimes data
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception', showtimes: [{ time: '10:00 AM', available: true }, { time: '2:00 PM', available: false }] },
    { id: 2, title: 'Interstellar', showtimes: [{ time: '12:00 PM', available: true }, { time: '5:00 PM', available: true }] },
    { id: 3, title: 'The Dark Knight', showtimes: [{ time: '9:00 AM', available: true }] },
  ]);

  // State to track new showtime input
  const [newShowtime, setNewShowtime] = useState('');

  // Add new showtime to the selected movie
  const addShowtime = (movieId, newTime) => {
    if (newTime.trim() === '') return; // Prevent adding empty time
    setMovies(
      movies.map((movie) =>
        movie.id === movieId
          ? { ...movie, showtimes: [...movie.showtimes, { time: newTime, available: true }] }
          : movie
      )
    );
    setNewShowtime(''); // Clear the input after adding the showtime
  };

  // Toggle availability of a showtime
  const toggleAvailability = (movieId, time) => {
    setMovies(
      movies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              showtimes: movie.showtimes.map((showtime) =>
                showtime.time === time ? { ...showtime, available: !showtime.available } : showtime
              ),
            }
          : movie
      )
    );
  };

  // Delete a showtime
  const deleteShowtime = (movieId, time) => {
    setMovies(
      movies.map((movie) =>
        movie.id === movieId
          ? { ...movie, showtimes: movie.showtimes.filter((showtime) => showtime.time !== time) }
          : movie
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/shows-background.jpg')" }}></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Show Management</h1>
        <p className="text-white text-lg mt-2">Add and manage showtimes for movies</p>
      </div>

      {/* Navigation Links */}
      <div className="absolute top-4 left-4">
        <Link to="/movies" className="text-white font-bold text-xl mr-4">← Back to Movies Management</Link>
      </div>

      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
        {/* Movies List */}
        {movies.map((movie) => (
          <div key={movie.id} className="mb-8">
            <h2 className="text-white text-2xl font-semibold mb-4">{movie.title}</h2>

            {/* Add Showtime Section */}
            <div className="flex items-center mb-4">
              <input
                type="time"
                value={newShowtime}
                onChange={(e) => setNewShowtime(e.target.value)} // Update state with input value
                className="bg-white text-black rounded-lg p-2 mr-4"
                placeholder="Add new time"
              />
              <button
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => addShowtime(movie.id, newShowtime)} // Use current state as the new time
              >
                Add Showtime
              </button>
            </div>

            {/* Showtime Table */}
            <table className="w-full text-left text-white">
              <thead className="bg-red-800">
                <tr>
                  <th className="py-2 px-4">Showtime</th>
                  <th className="py-2 px-4">Availability</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {movie.showtimes.map((showtime, index) => (
                  <tr key={index} className="hover:bg-red-700 transition">
                    <td className="py-2 px-4">{showtime.time}</td>
                    <td className="py-2 px-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showtime.available}
                          onChange={() => toggleAvailability(movie.id, showtime.time)}
                          className="form-checkbox h-5 w-5 text-red-500"
                        />
                        <span className="ml-2 text-white">{showtime.available ? 'Available' : 'Sold Out'}</span>
                      </label>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg font-semibold"
                        onClick={() => deleteShowtime(movie.id, showtime.time)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowManagementPage;