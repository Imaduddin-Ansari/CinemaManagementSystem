import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EditMoviePage = () => {
  const location = useLocation();
  const { movie, onEditMovie } = location.state || {};
  const [updatedMovie, setUpdatedMovie] = useState({ ...movie });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie({ ...updatedMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEditMovie) {
      onEditMovie(updatedMovie);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center">
      <div className="bg-black/70 p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-3xl text-red-500 font-bold text-center mb-6">Edit Movie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={updatedMovie.title}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="genre"
            value={updatedMovie.genre}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="number"
            name="year"
            value={updatedMovie.year}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMoviePage;
