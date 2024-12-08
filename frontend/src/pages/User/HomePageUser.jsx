import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Play, Info } from "lucide-react";
import { useGetTrendingContent } from "../../store/useGetTrendingContent";
import { useGetMovies } from "../../store/useGetMovies"; // Import the custom hook
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";

export const HomePageUser = () => {
  const { trendingContent } = useGetTrendingContent();
  const { movies, loading, error } = useGetMovies(); // Use the custom hook
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <div className="flex flex-col w-full">
      {/* Navbar */}
      <Navbar userName="" onSearch={handleSearch} />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-white font-poppins">
        {searchQuery && (
          <div className="mt-5 text-center">
            <p className="text-gray-400 text-lg font-medium mb-2">
              Search Results For:
            </p>
            <span className="text-lg font-medium">
              <strong>{searchQuery}</strong>
            </span>
          </div>
        )}

        {/* Background Image */}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="Hero img"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-5" />

        {/* Hero Content */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-5" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 z-5" />
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0]} |{" "}
              {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + " ..."
                : trendingContent?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-red text-black font-bold py-2 px-4 rounded mr-4 flex items-center z-20"
            >
              <Play className="size 6 inline-block mr-2 fill-black" />
              Play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center z-20"
            >
              <Info className="size 6 inline-block mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-4 bg-black" />

      {/* Trending Movies Section */}
      <div className="w-full px-8 py-6 bg-gradient-to-br from-black to-red-950">
  <h2 className="text-2xl font-bold text-white mb-4">Now Showing</h2>
  {loading && <p className="text-white">Loading movies...</p>}
  {error && <p className="text-red-500">{error}</p>}
  {!loading && !error && (
    <div className="flex overflow-x-auto space-x-4">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="relative cursor-pointer flex-shrink-0 group"
          onClick={() => setSelectedMovie(movie)}
        >
          {/* Movie Poster */}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-32 h-48 object-cover rounded transform transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
          />
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium">{movie.title}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


      {/* Modal for Movie Details */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-black rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 text-white">
            <h3 className="text-2xl font-bold">{selectedMovie.title}</h3>
            <p className="text-sm mt-1">{selectedMovie.genre.join(", ")}</p>
            <p className="mt-4">{selectedMovie.description}</p>
            <p className="mt-4">Rating: {selectedMovie.rating} / 10</p>
            <p className="mt-4">Duration: {selectedMovie.duration} minutes</p>
            <button
              className="mt-6 bg-red-600 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
