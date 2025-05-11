import React, { useState, useEffect } from 'react';
import { Navbar } from "../../components/Navbar";
import axios from 'axios';
import { HiPencilAlt } from 'react-icons/hi';

export const ProfilePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: {
      phone: '',
      address: ''
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [editMode, setEditMode] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/profile', {
          withCredentials: true
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          phone: response.data.contact.phone,
          address: response.data.contact.address
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/users/profile', formData, {
        withCredentials: true
      });
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        withCredentials: true
      });
      setUser(response.data);
      setFormData({
        name: response.data.name,
        phone: response.data.contact.phone,
        address: response.data.contact.address
      });
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
        <div className='min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center relative overflow-hidden '>
      <Navbar userName="" onSearch={handleSearch}/>
      <div className="w-1/2 h-auto mx-auto p-8 bg-gradient-to-tl from-black to-red-950 rounded-lg shadow-2xl mt-10 text-white font-poppins">
        <h1 className="text-4xl font-semibold text-center mb-8">My Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xl font-medium mb-2 text-gray-400">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none hover:border-white hover:text-white focus:border-white focus:text-white transition"
                placeholder="Enter your name"
              />
            ) : (
              <p className="text-xl">{user.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-xl font-medium mb-2 text-gray-400">Email</label>
            <p className="text-xl">{user.email}</p>
          </div>

          <div className="mb-6">
            <label className="block text-xl font-medium mb-2 text-gray-400">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none hover:border-white hover:text-white focus:border-white focus:text-white transition"
                placeholder="Enter your phone"
              />
            ) : (
              <p className="text-xl">{user.contact.phone}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-xl font-medium mb-2 text-gray-400">Address</label>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none hover:border-white hover:text-white focus:border-white focus:text-white transition"
                placeholder="Enter your address"
              />
            ) : (
              <p className="text-xl">{user.contact.address}</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className="px-6 py-3 bg-red-950 text-lg rounded-md hover:bg-red-800 transition-colors flex items-center"
            >
              <HiPencilAlt className="mr-2" />
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>

            {editMode && (
              <button
                type="submit"
                className="px-6 py-3 bg-red-950 text-lg text-white rounded-md hover:bg-red-800 transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
      </div>
    </>
  );
};
