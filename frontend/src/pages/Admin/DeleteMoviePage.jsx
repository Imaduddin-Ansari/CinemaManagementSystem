import React, { useState } from "react";

const DeleteMoviePage = () => {
  const [movieId, setMovieId] = useState("");

  const handleDelete = () => {
    if (movieId) {
      console.log("Movie ID to delete:", movieId);
      // Add functionality to delete the movie from the backend
    } else {
      alert("Please select or enter a movie ID to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center">
      <div className="bg-black/70 p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
          Delete a Movie
        </h2>
        <div className="space-y-4">
          <label className="block text-white mb-1">Enter Movie ID or Name</label>
          <input
            type="text"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter movie ID or name"
            required
          />
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition"
          >
            Delete Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMoviePage;
