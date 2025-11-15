// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { LogIn, Shield, Key } from 'lucide-react';

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [staffId, setStaffId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // API call to the backend login endpoint
//       const res = await fetch('http://localhost:8080/login/admin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // Send role as 'admin' and the staffId for identification
//         body: JSON.stringify({ role: 'admin', staffId, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Login failed. Check Staff ID and Password.');
//         return;
//       }

//       // Success: Store token, update state, and redirect
//       localStorage.setItem('token', data.token); 
//       localStorage.setItem('role', data.role);
//       localStorage.setItem('admin', JSON.stringify(data.admin));
//       navigate('/admin/dashboard');

//     } catch (err) {
//       // Log server error if fetch fails
//       console.error("Login Server Error:", err);
//       setError('Server error, please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-indigo-50 p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-indigo-100">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
//           <Shield className="w-7 h-7 inline-block mr-2 text-indigo-600" />
//           Admin/Staff Sign In
//         </h2>
        
//         {/* Error Display */}
//         {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Staff ID Input */}
//           <div>
//             <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">
//               Staff ID
//             </label>
//             <div className="mt-1 relative rounded-lg shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <LogIn className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                     id="staffId"
//                     name="staffId"
//                     type="text"
//                     required
//                     placeholder="Enter your Staff ID"
//                     value={staffId}
//                     onChange={(e) => setStaffId(e.target.value)}
//                     className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <div className="mt-1 relative rounded-lg shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Key className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {loading ? 'Logging in...' : 'Sign In as Admin'}
//           </button>
//         </form>
        
//         <div className="mt-6 text-center text-sm">
//             <Link to="/" className="font-medium text-gray-500 hover:text-indigo-600">
//                 &larr; Back to Role Selection
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Shield, Key } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // API call to the backend login endpoint
      const res = await fetch('http://localhost:8080/login/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send role as 'admin' and the staffId for identification
        body: JSON.stringify({ role: 'admin', staffId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed. Check Staff ID and Password.');
        return;
      }

      // Success: Store token, update state, and redirect
      localStorage.setItem('token', data.token); 
      // NOTE: state setters are handled in App.jsx via props from parent component
      // setRole('admin'); 
      // setIsAuthenticated(true);
      navigate('/admin/dashboard');

    } catch (err) {
      // Log server error if fetch fails
      console.error("Login Server Error:", err);
      setError('Server error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-indigo-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-indigo-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          <Shield className="w-7 h-7 inline-block mr-2 text-indigo-600" />
          Admin/Staff Sign In
        </h2>
        
        {/* Error Display */}
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Staff ID Input */}
          <div>
            <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">
              Staff ID
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LogIn className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="staffId"
                    name="staffId"
                    type="text"
                    required
                    placeholder="Enter your Staff ID"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
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
            {loading ? 'Logging in...' : 'Sign In as Admin'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm space-y-2">
            {/* New: Registration Link */}
            <p className="text-gray-700">
                New Staff? 
                <Link to="/register/admin" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                    Register Here
                </Link>
            </p>
            {/* Back to Role Selection */}
            <p>
                <Link to="/" className="font-medium text-gray-500 hover:text-indigo-600">
                    &larr; Back to Role Selection
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;