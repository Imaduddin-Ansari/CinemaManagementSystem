import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../../components/Navbar";

export const MyWishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/wishlist", {
          withCredentials: true,
        });
        setWishlist(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch wishlist");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = async (movieId) => {
    try {
      await axios.delete("http://localhost:3000/api/wishlist/remove", {
        withCredentials: true,
        data: { movieId },
      });
      setWishlist((prev) => prev.filter((movie) => movie._id !== movieId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete movie from wishlist");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  return (
    <>
        <div className='min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden'>
      <Navbar userName="" onSearch={handleSearch}/>
      <div className="top-28" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h1 className="mt-20 text-4xl font-bold text-white">My Wishlist</h1>
      </div>
      <div className="p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {loading ? (
          <p className="text-5xl text-white">Loading wishlist...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : wishlist.length === 0 ? (
          <p className="text-gray-300">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            {wishlist.map((movie) => (
              <div
                key={movie._id}
                className="bg-transparent shadow-md rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-56 h-80 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-center text-white">{movie.title}</h3>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
};
