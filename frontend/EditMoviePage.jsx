// src/pages/EditMoviePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditMoviePage = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSave = () => {
    console.log('Updated Movie:', movie);
    // Implement actual update logic here
    navigate('/movies'); // Redirect back to movies management page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/movies-background.jpg')" }}></div>
      
      <div className="relative z-10 w-[400px] bg-black bg-opacity-80 rounded-lg p-8 shadow-lg">
        <h2 className="text-red-500 text-3xl font-bold text-center mb-6">Edit Movie</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-white text-sm font-semibold mb-2">Movie Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={movie.title}
              onChange={handleChange}
              className="w-full bg-black/70 border border-gray-600 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-white text-sm font-semibold mb-2">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              className="w-full bg-black/70 border border-gray-600 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-white text-sm font-semibold mb-2">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={movie.year}
              onChange={handleChange}
              className="w-full bg-black/70 border border-gray-600 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
              onClick={() => navigate('/movies')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMoviePage;
