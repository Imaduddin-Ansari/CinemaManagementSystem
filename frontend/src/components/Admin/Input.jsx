// src/components/Input.jsx
import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, icon: Icon, className = '' }) => {
  return (
    <div className={`flex items-center p-2 border rounded-lg ${className}`}>
      {Icon && <Icon className="mr-2 text-gray-500" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border-none outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
