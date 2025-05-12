// src/pages/EditEmployeePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  // In a real app, this would be fetched from a server using the id
  useEffect(() => {
    // Simulate fetching employee data
    const employee = {
      id,
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'Engineering',
    };
    setName(employee.name);
    setPosition(employee.position);
    setDepartment(employee.department);
  }, [id]);

  const handleSubmit = () => {
    const updatedEmployee = { id, name, position, department };
    console.log('Updated employee:', updatedEmployee);
    navigate('/employees'); // Go back to employee management page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 left-4">
        <a href="/employees" className="text-white font-bold text-xl">← Back to Employee Management</a>
      </div>

      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Edit Employee</h1>
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
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
