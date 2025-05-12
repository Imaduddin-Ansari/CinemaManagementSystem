import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/NavbarEmployee';

export const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updateForm, setUpdateForm] = useState({ reply: '', status: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://cinema-backend:3000/api/customer-support/reviews');
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://cinema-backend:3000/api/customer-support/reviews/${selectedReview._id}`,
        updateForm
      );
      alert(response.data.message || 'Review updated successfully');
      setReviews((prev) =>
        prev.map((review) =>
          review._id === selectedReview._id ? response.data.review : review
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Unable to update review');
    }
  };

  const closeModal = () => {
    setSelectedReview(null);
    setUpdateForm({ reply: '', status: '' });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-black to-red-950 text-white">
      {/* Navbar */}
      <Navbar userName="Employee" />

      {/* Main Content */}
      <div className="p-8 flex-grow">
        <div className="container mx-auto outline outline-red-500 bg-black shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-red-500 text-center">Reviews</h1>

          <table className="w-full outline outline-white table-auto text-left bg-gradient-to-br from-black to-red-950 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gradient-to-br from-black to-red-950 text-red-400">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Movie</th>
                <th className="px-6 py-3">Review</th>
                <th className="px-6 py-3">Reply</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-b border-white hover:bg-gray-800">
                  <td className="px-6 py-3">{review.userId?.name || 'N/A'}</td>
                  <td className="px-6 py-3">{review.movieId?.title || 'N/A'}</td>
                  <td className="px-6 py-3">{review.comment || 'No review text'}</td>
                  <td className="px-6 py-3">{review.reply || 'No reply yet'}</td>
                  <td className="px-6 py-3">{review.status || 'open'}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setUpdateForm({ reply: review.reply || '', status: review.status || 'open' });
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-6 rounded-lg w-1/3">
           
            <h2 className="text-2xl font-bold mb-4">Update Review</h2>
            <form onSubmit={handleUpdateReview} className="space-y-4">
              <div>
                <label className="block mb-2">Reply</label>
                <textarea
                  value={updateForm.reply}
                  onChange={(e) => setUpdateForm({ ...updateForm, reply: e.target.value })}
                  className="w-full p-2 bg-black outline outline-white rounded-lg text-white"
                  rows="3"
                  placeholder="Write a reply..."
                ></textarea>
              </div>
              <div>
                <label className="block mb-2">Status</label>
                <select
                  value={updateForm.status}
                  onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                  className="w-full p-2 bg-black outline outline-white rounded-lg text-white"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
