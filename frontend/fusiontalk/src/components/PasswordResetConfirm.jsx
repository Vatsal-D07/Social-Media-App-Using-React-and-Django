import React, { useState } from 'react';
import AxiosInstance from './Axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../App.css'; // Assuming the CSS is in this file for global styles

export default function PasswordResetConfirm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await AxiosInstance.post('/account/password_reset_confirm/', {
                password,
                uidb64,
                token
            });
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 3000); // Redirect to login after successful reset
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'An error occurred. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inset-0 absolute min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
            <div className="w-full max-w-md px-8 py-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">Reset Password</h1>
                    <p className="mt-2 text-lg text-gray-400 text-center">Enter your new password.</p>
                    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                    {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">New Password</label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 pr-12 text-white"
                                placeholder="Enter your new password"
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition duration-300"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
                        <div className="relative">
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 pr-12 text-white"
                                placeholder="Confirm your new password"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition duration-300"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 flex justify-center"
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-6 w-6 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
