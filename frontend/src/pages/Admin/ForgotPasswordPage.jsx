import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = () => {
    // Add password reset logic here
    console.log('Password reset request for:', email);
    setMessage('If this email is registered, you will receive a password reset link.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 flex items-center justify-center">
      <div className="bg-black bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-red-500 text-3xl font-bold text-center mb-6">Forgot Password</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-white mb-2">Enter your registered email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="button"
            onClick={handlePasswordReset}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
