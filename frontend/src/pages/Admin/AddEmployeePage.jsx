// src/pages/AddEmployeePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployeePage = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newEmployee = { id: Date.now(), name, position, department };
    // Here you would typically make an API call to save the employee data
    console.log('New employee added:', newEmployee);
    navigate('/employees'); // Go back to employee management page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 left-4">
        <a href="/employees" className="text-white font-bold text-xl">← Back to Employee Management</a>
      </div>

      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Add Employee</h1>
      </div>

      <div className="w-full max-w-md bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
