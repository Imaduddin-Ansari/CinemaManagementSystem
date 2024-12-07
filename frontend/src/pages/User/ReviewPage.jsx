import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from "../../components/Navbar";
import { FaStar } from 'react-icons/fa';

export const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reviews', {
          withCredentials: true,
        });
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar userName="John Doe" />
        <div className="text-center mt-10">
          <p className="text-2xl text-gray-700">Loading reviews...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar userName="John Doe" />
        <div className="text-center mt-10">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar userName="" />
      <div
        className="fixed top-20 left-0 w-full h-[calc(100%-5rem)] overflow- bg-transparent text-white p-6"
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', fontFamily: 'Poppins, sans-serif' }}
      >
        <h1 className="text-4xl font-semibold mb-6 text-center text-white">My Reviews</h1>
        {reviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-separate border-spacing-y-4 border-spacing-x-0">
              <thead>
                <tr className="bg-gradient-to-br from-black to-red-950 text-white">
                  <th className="px-4 py-2 border border-black text-center">#</th>
                  <th className="px-4 py-2 border border-black text-center">Movie</th>
                  <th className="px-4 py-2 border border-black text-center">Stars</th>
                  <th className="px-4 py-2 border border-black text-center">Comment</th>
                  <th className="px-4 py-2 border border-black text-center">Reply</th>
                  <th className="px-4 py-2 border border-black text-center">Status</th>
                  <th className="px-4 py-2 border border-black text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr
                    key={review._id}
                    className="bg-black hover:bg-red-800 hover:shadow-lg duration-300 ease-in-out"
                  >
                    <td className="px-4 py-4 border border-transparent ">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 border border-transparent ">
                      {review.movieId.title}
                    </td>
                    <td className="px-4 py-4 border border-transparent flex items-center">
                      {Array(review.stars)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            className="text-white mr-1 hover:scale-125 transition-transform duration-200"
                          />
                        ))}
                    </td>
                    <td className="px-4 py-4 border border-transparent ">
                      {review.comment}
                    </td>
                    <td className="px-4 py-4 border border-transparent ">
                      {review.reply || 'No reply yet'}
                    </td>
                    <td className="px-4 py-4 border border-transparent capitalize ">
                      {review.status}
                    </td>
                    <td className="px-4 py-4 border border-transparent ">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xl text-center text-gray-400">No reviews found</p>
        )}
      </div>
    </>
  );
  
};
