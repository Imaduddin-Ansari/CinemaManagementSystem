// src/pages/EmployeeManagementPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeManagementPage = () => {
  // Sample employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager', department: 'Management' },
    { id: 3, name: 'Bob Johnson', position: 'Product Designer', department: 'Design' },
  ]);

  // Delete employee
  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/path/to/employee-background.jpg')" }}></div>

      {/* Navigation Links */}
      <div className="absolute top-4 left-4">
        <Link to="/admin-dashboard" className="text-white font-bold text-xl">
          ← Back to Dashboard
        </Link></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-red-500 text-4xl font-extrabold">Employee Management</h1>
        <p className="text-white text-lg mt-2">Add, View, Edit, and Delete Employee Details</p>
      </div>

      {/* Employee List */}
      <div className="relative z-10 w-[90%] max-w-[1200px] bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/employees/add"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Add Employee
          </Link>
        </div>

        {/* Employee Table */}
        <table className="w-full text-left text-white">
          <thead className="bg-red-800">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Position</th>
              <th className="py-2 px-4">Department</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-red-700 transition">
                <td className="py-2 px-4">{employee.name}</td>
                <td className="py-2 px-4">{employee.position}</td>
                <td className="py-2 px-4">{employee.department}</td>
                <td className="py-2 px-4 text-center">
                  <Link
                    to={`/employees/edit/${employee.id}`}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-400 font-semibold"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
