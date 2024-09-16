import React, { useState } from 'react';
import AxiosInstance from './Axios';
import '../App.css'; // Assuming you have global styles here
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await AxiosInstance.post('/account/password_reset/', { email });
            setMessage(response.data.message || 'A reset link has been sent to your email.');
        } catch (error) {
            console.log(error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="inset-0 absolute min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
            <div className="w-full max-w-md px-8 py-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
                    Reset Password
                </h2>
                <p className="mt-2 text-lg text-gray-400 text-center">
                    Enter your email to receive a reset link.
                </p>
                {message && <p className="mt-4 text-center text-purple-500">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 text-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 flex justify-center"
                        >
                            {loading ? (
                                <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-transparent"></div>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Remembered your password? <button onClick={() => navigate('/login')} className="text-purple-500 hover:underline">Login</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
