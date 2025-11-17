import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Key, Mail, Building2, Briefcase, Phone, Shield } from 'lucide-react';

// Helper component for styled input fields
const FormInput = ({ label, name, type, placeholder, value, onChange, required, Icon, min, max }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-1 relative rounded-lg shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        className={`block w-full py-2 px-4 ${Icon ? 'pl-10' : ''} border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
      />
    </div>
  </div>
);

const AdminRegisterationPage = () => {
  // Role is hardcoded to 'admin' for this page
  const role = 'admin'; 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    password: '',
    confirmPassword: '',

    // Admin fields
    staffId: '',
    designation: '',
    email: '', // Used as primary login/contact email for admin
    hostelName: '',
    adminPhoneNumber: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form state
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // --- Validation Check (Admin Fields Only) ---
    const requiredFields = [ 'name', 'staffId', 'designation', 'email', 'adminPhoneNumber', 'password' ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the required field: ${field}`);
        return;
      }
    }
    
    setLoading(true);

    // --- Prepare Body (Admin Only) ---
    const body = {
      role,
      name: formData.name,
      staffId: formData.staffId,
      designation: formData.designation,
      personalEmail: formData.email,
      hostelName: formData.hostelName,
      phoneNumber: formData.adminPhoneNumber, // Mapped to phoneNumber on backend
      password: formData.password,
    };

    try {
      const res = await fetch('http://localhost:8080/register/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed.');
        setLoading(false);
        return;
      }

      // Successful registration
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      console.log('Admin registration successful! Redirecting to login.');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('A network error occurred. Please check the server connection.');
    } finally {
      setLoading(false);
    }
  };

  const title = 'Admin/Staff Account Registration';

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-indigo-50 p-4">
      <div className="w-full max-w-3xl bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4 flex items-center justify-center">
          <Shield className="w-7 h-7 mr-2 text-indigo-600" />
          {title}
        </h2>
       


        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* --- Staff Information --- */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2">Staff Information</h3>
            </div>
            
            <FormInput 
              label="Full Name" name="name" type="text" placeholder="Jane Doe" 
              value={formData.name} onChange={handleChange} required={true} 
            />
            <FormInput 
              label="Staff ID" name="staffId" type="text" placeholder="STAFF102" 
              value={formData.staffId} onChange={handleChange} required={true} 
            />
            
            {/* Designation Dropdown */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                Designation <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="block w-full py-2 px-4 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="">Select Role</option>
                  <option value="chief warden">Chief Warden</option>
                  <option value="warden">Warden</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="system admin">System Admin</option>
                </select>
              </div>
            </div>
            
            <FormInput 
              label="Hostel Name (If applicable)" name="hostelName" type="text" placeholder="All / A Block" 
              value={formData.hostelName} onChange={handleChange} required={false} // Removed required
              Icon={Building2}
            />

            {/* --- Contact Details --- */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2 mt-4">Contact & Login</h3>
            </div>

            <FormInput 
              label="Official Email (Login ID)" name="email" type="email" placeholder="admin@hostel.com" 
              value={formData.email} onChange={handleChange} required={true}
              Icon={Mail}
            />
            <FormInput 
              label="Phone Number" name="adminPhoneNumber" type="tel" placeholder="9876543210" 
              value={formData.adminPhoneNumber} onChange={handleChange} required={true}
              Icon={Phone}
            />
            
            {/* --- Security --- */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2 mt-4">Security</h3>
            </div>

            <FormInput 
              label="Password" name="password" type="password" placeholder="Min 8 characters" 
              value={formData.password} onChange={handleChange} required={true}
              Icon={Key}
            />
            <FormInput 
              label="Confirm Password" name="confirmPassword" type="password" placeholder="Repeat password" 
              value={formData.confirmPassword} onChange={handleChange} required={true}
              Icon={Key}
            />
          </div>

          <div className="pt-4 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Registering...' : 'Create Admin/Staff Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Renaming the default export to AdminRegister to reflect its function
// We keep the file name as CommonRegister.jsx for routing compatibility in App.jsx
export default AdminRegisterationPage;