import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, Key } from 'lucide-react';

const StudentLogin = () => {
  const navigate = useNavigate();

  const [registrationId, setRegistrationId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/login/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'student', registrationId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed. Check Registration ID and Password.');
        return;
      }

      // Success
      localStorage.setItem('token', data.token); 
      localStorage.setItem('role', data.role);
      localStorage.setItem('studentId', JSON.stringify(data.student.registrationId));
      
      navigate('/student/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      setError('Server error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          <User className="w-7 h-7 inline-block mr-2 text-indigo-600" />
          Student Sign In
        </h2>
        
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Registration ID Input */}
          <div>
            <label htmlFor="registrationId" className="block text-sm font-medium text-gray-700">
              Registration ID
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LogIn className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="registrationId"
                    name="registrationId"
                    type="text"
                    required
                    placeholder="Enter your Student ID"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Sign In as Student'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
            Need an account? 
            <Link to="/register/student" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                Register Here
            </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;