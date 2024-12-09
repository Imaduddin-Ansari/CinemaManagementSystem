import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for dynamic navigation

const MoviesManagementPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
    { id: 2, title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
    { id: 3, title: 'The Dark Knight', genre: 'Action', year: 2008 },
  ]);

  // Handle Delete Movie
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (confirmDelete) {
      setMovies(movies.filter((movie) => movie.id !== id));
    }
  };

  // Handle Movie Show Details (navigate to the show details page)
  const handleShowDetails = (id) => {
    navigate(`/movies/show-details/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Hero Section */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/path/to/movies-background.jpg')" }}
      ></div>
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Movies Management</h1>
        <p className="text-white text-lg mt-2">Manage your movie database effortlessly</p>
      </div>

      {/* Navigation Links */}
      <div className="absolute top-4 left-4">
        {/* Back to Dashboard */}
        <Link to="/admin-dashboard" className="text-white font-bold text-xl mr-4">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">Movies List</h2>
          <div className="space-x-4">
            <Link
              to="/movies/add"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Add Movie
            </Link>
            <Link
              to="/movies/show-management"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Manage Movie Shows
            </Link>
            <Link
              to="/movies/filter"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Filter Movies
            </Link>
          </div>
        </div>

        {/* Movies Table */}
        <table className="w-full text-left text-white">
          <thead className="bg-red-800">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Genre</th>
              <th className="py-2 px-4">Year</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-red-700 transition">
                  <td className="py-2 px-4">{movie.title}</td>
                  <td className="py-2 px-4">{movie.genre}</td>
                  <td className="py-2 px-4">{movie.year}</td>
                  <td className="py-2 px-4 text-center">
                    {/* Edit Link */}
                    <Link
                      to={`/movies/edit/${movie.id}`}
                      className="text-yellow-400 hover:text-yellow-300 font-semibold mr-4"
                    >
                      Edit
                    </Link>
                    {/* Delete Button */}
                    <button
                      className="text-red-500 hover:text-red-400 font-semibold mr-4"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </button>
                    {/* Show Details Button */}
                    <button
                      className="text-blue-500 hover:text-blue-400 font-semibold"
                      onClick={() => handleShowDetails(movie.id)}
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-400 italic"
                >
                  No movies found. Add a new movie to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoviesManagementPage;