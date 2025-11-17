import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, BookOpen, Key, Mail, Building2 } from 'lucide-react';

const StudentRegister = () => {
  // Hardcode role to 'student'
  const role = 'student';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    registrationId: '',
    course: '',
    yearOfStudy: '',
    personalEmail: '',
    phoneNumber: '',
    hostelName: '',
    roomNumber: '',
    password: '',
    confirmPassword: '',
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

    // Validate required fields (since role is hardcoded to student)
    const requiredStudentFields = [
      'name',
      'registrationId',
      'course',
      'yearOfStudy',
      'personalEmail',
      'hostelName',
      'roomNumber',
      'password',
    ];

    for (const field of requiredStudentFields) {
      if (!formData[field]) {
        setError(`Please fill in the required field: ${field}`);
        return;
      }
    }

    setLoading(true);

    // Prepare body for student registration
    const body = {
      role,
      name: formData.name,
      registrationId: formData.registrationId,
      course: formData.course,
      yearOfStudy: Number(formData.yearOfStudy),
      personalEmail: formData.personalEmail,
      phoneNumber: formData.phoneNumber,
      hostelName: formData.hostelName,
      roomNumber: formData.roomNumber,
      password: formData.password,
    };

    try {
      // NOTE: Replace this with your actual MERN backend endpoint
      const res = await fetch('http://localhost:8080/register/student', { 
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

      // Successful registration handling (e.g., store token if applicable)
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      console.log('Registration successful! Redirecting to login.');
      navigate('/login/student');
    } catch (err) {
      setError('A network error occurred. Please check the server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-indigo-50 p-4">
      <div className="w-full max-w-3xl bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
          <UserPlus className="w-7 h-7 mr-2 text-indigo-600" />
          Student Account Registration
        </h2>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* --- Personal Details --- */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2">Personal & Academic Info</h3>
            </div>
            
            <FormInput 
              label="Full Name" name="name" type="text" placeholder="John Doe" 
              value={formData.name} onChange={handleChange} required={true} 
            />
            <FormInput 
              label="Registration ID" name="registrationId" type="text" placeholder="2023PGCSCA016" 
              value={formData.registrationId} onChange={handleChange} required={true} 
            />
            <FormInput 
              label="Course" name="course" type="text" placeholder="MCA" 
              value={formData.course} onChange={handleChange} required={true} 
            />
            <FormInput 
              label="Batch" name="yearOfStudy" type="number" placeholder="2023-26" 
              value={formData.yearOfStudy} onChange={handleChange} required={true} 
            />

            {/* --- Contact & Hostel Details --- */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2 mt-4">Contact & Hostel Details</h3>
            </div>

            <FormInput 
              label="Personal Email" name="personalEmail" type="email" placeholder="you@example.com" 
              value={formData.personalEmail} onChange={handleChange} required={true}
              Icon={Mail}
            />
            <FormInput 
              label="Phone Number (Optional)" name="phoneNumber" type="tel" placeholder="9876543210" 
              value={formData.phoneNumber} onChange={handleChange} required={false}
            />
            <FormInput 
              label="Hostel Name" name="hostelName" type="text" placeholder="J (Upper case)" 
              value={formData.hostelName} onChange={handleChange} required={true}
              Icon={Building2}
            />
            <FormInput 
              label="Room Number" name="roomNumber" type="text" placeholder="B-205" 
              value={formData.roomNumber} onChange={handleChange} required={true}
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

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Registering...' : 'Create Student Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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


export default StudentRegister;