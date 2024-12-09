import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewMoviePage = ({ onAddMovie }) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({ title: "", genre: "", year: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMovie(movie); // Add the new movie to the list (passed as a prop)
    navigate("/movies"); // Redirect to Movies Management page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center">
      <div className="bg-black/70 p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
          Add New Movie
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Movie Title */}
          <div>
            <label className="block text-white mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter movie title"
              required
            />
          </div>
          {/* Genre */}
          <div>
            <label className="block text-white mb-1">Genre</label>
            <input
              type="text"
              name="genre"
              value={movie.genre}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter movie genre"
              required
            />
          </div>
          {/* Release Year */}
          <div>
            <label className="block text-white mb-1">Release Year</label>
            <input
              type="number"
              name="year"
              value={movie.year}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter release year"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewMoviePage;



