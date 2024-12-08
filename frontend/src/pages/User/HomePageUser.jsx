import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Play, Info, X, Heart, Star } from "lucide-react";
import { useGetTrendingContent } from "../../store/useGetTrendingContent";
import { useGetMovies } from "../../store/useGetMovies";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import axios from "axios";

export const HomePageUser = () => {
  const { trendingContent } = useGetTrendingContent();
  const { movies, loading, error } = useGetMovies();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    if (selectedMovie) {
      axios
        .get(`http://localhost:3000/api/reviews/${selectedMovie._id}`)
        .then((response) => {
          console.log("Reviews API response:", response.data); 
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error.message);
        });
    }
  }, [selectedMovie]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleBooking = (movieId) => {
    try {
      navigate(`/user-book/${movieId}`);
    } catch (error) {
      alert("Error navigating to booking page: " + (error.message || "Unknown error"));
    }
  };
  

  const closeModal = () => setSelectedMovie(null);

  const handleAddToWishlist = async (movieId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/wishlist/add",
        { movieId },
        { withCredentials: true }
      );
      alert(response.data.message || "Movie added to wishlist");
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "An error occurred while adding to the wishlist";
      alert(errorMessage);
    }
  };
  

  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Prevent the form's default behavior
    if (stars === 0 || !reviewText) {
      alert("Please add a rating and comment");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/reviews/add",
        { stars, comment: reviewText, movieId: selectedMovie._id },
        { withCredentials: true }
      );
      alert("Review added successfully!");
      setReviewText(""); // Clear review text
      setStars(0); // Reset stars
      // Fetch updated reviews
      setReviews((prevReviews) => [...prevReviews, response.data.review]);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "An error occurred while submitting your review";
      alert(errorMessage);
    }
  };
  

  return (
    <div className="flex flex-col w-full">
      {/* Navbar */}
      <Navbar userName="" onSearch={handleSearch} />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-white font-poppins">
        {searchQuery && (
          <div className="mt-5 text-center">
            <p className="text-gray-400 text-lg font-medium mb-2">Search Results For:</p>
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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-black rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 text-white relative max-h-[90vh] overflow-y-auto">
      <X
        className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:scale-110 transition hover:text-white"
        size={24}
        onClick={closeModal}
      />
      <div className="flex">
        <img
          src={selectedMovie.posterUrl}
          alt={selectedMovie.title}
          className="w-32 h-48 object-cover rounded mr-4"
        />
        <div>
          <h3 className="text-2xl font-bold">{selectedMovie.title}</h3>
          <p className="text-sm mt-1">{selectedMovie.genre.join(", ")}</p>
          <p className="mt-4">{selectedMovie.description}</p>
          <p className="mt-4">Rating: {selectedMovie.rating} / 5</p>
          <p className="mt-4">Duration: {selectedMovie.duration} minutes</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
      <button
              className="bg-red-700 text-white py-2 px-4 rounded hover:scale-110 transition hover:bg-red-900"
              onClick={() => handleBooking(selectedMovie._id)} // Handle booking
            >
              Book
            </button>
        <button
          className="bg-transparent text-white p-2 rounded-full"
          onClick={() => handleAddToWishlist(selectedMovie._id)}
        >
          <Heart className="inline-block text-red-600 hover:fill-red-600 hover:scale-110 transition " size={24} />
        </button>
      </div>

      <div className="mt-6">
  <h4 className="text-lg font-bold">Add a Review</h4>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      console.log("Form submitted");
      handleReviewSubmit(e);
    }}
    className="mt-4"
  >
    <div className="flex mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`cursor-pointer text-red-600 hover:fill-red-600 hover:scale-110 transition ${
            star <= stars ? "fill-red-600" : ""
          }`}
          size={24}
          onClick={() => setStars(star)}
        />
      ))}
    </div>
    <textarea
      className="w-full p-2 mt-2 bg-black text-white border border-gray-600 rounded-sm h-20"
      rows="4"
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
      placeholder="Write your review here"
    />
    <button
      type="submit"
      className="mt-4 bg-red-700 text-white py-2 px-4 rounded hover:scale-110 transition hover:bg-red-900"
    >
      Submit Review
    </button>
  </form>
</div>



      {/* Display Reviews */}
      <div className="mt-6">
        <h4 className="text-lg font-bold">Reviews</h4>
        <div className="h-64 overflow-y-auto mt-4 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="p-4 bg-black border border-gray-600 rounded-md">
                <p className="text-white font-semibold">
                  <strong>{review.userId.name}</strong>
                </p>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`text-red-600 ${star <= review.stars ? "fill-red-600" : "fill-transparent"} `}
                      size={16}
                    />
                  ))}
                </div>
                <p className="mt-2 text-white">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No reviews yet for this movie</p>
          )}
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
