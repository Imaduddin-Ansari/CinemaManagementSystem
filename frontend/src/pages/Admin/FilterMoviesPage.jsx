import React, { useState } from "react";
import { Link } from 'react-router-dom';

const FilterMoviesPage = () => {
  const [filters, setFilters] = useState({
    genre: "All",
    showtime: "All",
    available: "All",
  });

  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, available: true, showtimes: ["12:00 PM", "03:00 PM", "06:00 PM"] },
    { id: 2, title: "Interstellar", genre: "Sci-Fi", year: 2014, available: false, showtimes: ["01:00 PM", "04:00 PM", "07:00 PM"] },
    { id: 3, title: "The Dark Knight", genre: "Action", year: 2008, available: true, showtimes: ["11:00 AM", "02:00 PM", "05:00 PM"] },
    { id: 4, title: "The Matrix", genre: "Sci-Fi", year: 1999, available: true, showtimes: ["01:30 PM", "04:30 PM", "08:00 PM"] },
  ]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filter movies based on selected filters
  const filteredMovies = movies.filter((movie) => {
    const genreMatch = filters.genre === "All" || movie.genre === filters.genre;
    const availableMatch = filters.available === "All" || movie.available === (filters.available === "Available");
    const showtimeMatch =
      filters.showtime === "All" ||
      movie.showtimes.includes(filters.showtime);

    return genreMatch && availableMatch && showtimeMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Hero Section */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/movies-background.jpg')" }}></div>
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Filter Movies</h1>
        <p className="text-white text-lg mt-2">Filter movies based on genres, showtimes, and availability</p>
      </div>

      <div className="absolute top-4 left-4">
        <Link to="/movies" className="text-white font-bold text-xl mr-4">← Back to Movies Management</Link>
      </div>

      {/* Filters Section */}
      <div className="relative z-10 bg-black bg-opacity-80 w-[90%] max-w-[1200px] p-6 rounded-lg shadow-lg">
        <div className="flex space-x-4 mb-6">
          {/* Genre Filter */}
          <select
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            <option value="All">All Genres</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
          </select>

          {/* Showtimes Filter */}
          <select
            name="showtime"
            value={filters.showtime}
            onChange={handleFilterChange}
            className="bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            <option value="All">All Showtimes</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
            <option value="08:00 PM">08:00 PM</option>
          </select>

          {/* Availability Filter */}
          <select
            name="available"
            value={filters.available}
            onChange={handleFilterChange}
            className="bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Movies Table */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">Movies List</h2>
        </div>
        <table className="w-full text-left text-white">
          <thead className="bg-red-800">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Genre</th>
              <th className="py-2 px-4">Year</th>
              <th className="py-2 px-4">Showtimes</th>
              <th className="py-2 px-4">Availability</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <tr key={movie.id} className="hover:bg-red-700 transition">
                  <td className="py-2 px-4">{movie.title}</td>
                  <td className="py-2 px-4">{movie.genre}</td>
                  <td className="py-2 px-4">{movie.year}</td>
                  <td className="py-2 px-4">{movie.showtimes.join(", ")}</td>
                  <td className="py-2 px-4">{movie.available ? "Available" : "Unavailable"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-white">
                  No movies match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterMoviesPage;
