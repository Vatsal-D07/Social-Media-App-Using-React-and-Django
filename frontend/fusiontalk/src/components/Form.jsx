import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import AxiosInstance from "./Axios";
import { ACCESS_TOKEN, REFRESH_TOKEN ,USER_ID,USER_NAME} from "../constants";
import '../App.css'; // Assuming the CSS is in this file
import { useGoogleLogin } from '@react-oauth/google'
import GoogleButton from 'react-google-button'

export default function FormRegLog({ route, method }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register";



    // GOOGLE LOGIN
    const handleGoogleLoginSuccess= async (codeResponse) => {
        const authorizationCode = codeResponse.code;
        try {
          const response = await AxiosInstance.post('/account/login-with-google/', {
            code: authorizationCode,  // Send the authorization code as a JSON object
          });
      
          const { access_token,refresh_token, username ,user_id} = response.data;  // Extract data from response
        //   console.log(user_id)
          // Store access token and username in local storage
          localStorage.setItem(ACCESS_TOKEN, access_token);
          localStorage.setItem(REFRESH_TOKEN, refresh_token);
          localStorage.setItem(USER_NAME, username);
          localStorage.setItem(USER_ID, user_id);
      
          // Navigate to the home page after successful login
          navigate('/app');
        //   window.location.reload();  // Optionally reload the page
      
        } catch (error) {
          console.error('Error exchanging authorization code:', error);  // Handle errors
        }
      };
      
    const g_login=useGoogleLogin({
        onSuccess:handleGoogleLoginSuccess,
        flow:'auth-code'
    });


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError(null);

        if (method === "register" && password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const payload = method === "register"
                ? { username, email, password }
                : { username, password };

            const res = await AxiosInstance.post(route, payload);
            console.log(res.data)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem(USER_NAME, res.data.username);
                localStorage.setItem(USER_ID, res.data.user_id);
                // console.log('User ID:', res.data.user_id);  // Access the user ID here
                // console.log('Username:', res.data.username);
                navigate('/app');
            } else {
                navigate("/login");
            }
        } catch (error) {
            setError("An error occurred. Please check your inputs and try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inset-0 absolute min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
            <div className="w-full max-w-md px-8 py-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">{name}</h1>
                    <p className="mt-2 text-lg text-gray-400 text-center">Welcome! Please {method === "login" ? "login to your account" : "create an account"}.</p>
                    {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-white mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    {method === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-white mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
                                placeholder="Enter your email"
                                type="email"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-400">Password</label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-white mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 pr-12"
                                placeholder="Enter your password"
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
                    {method === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
                            <div className="relative">
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="text-white mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300 pr-12"
                                    placeholder="Confirm your password"
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
                    )}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="remember" 
                                className="h-4 w-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">Remember me</label>
                        </div>
                        <button type="button" onClick={()=>{navigate('/reset-password')}} className="text-sm text-purple-500 hover:underline">Forgot password?</button>
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
                                name
                            )}
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={g_login}
                            type="button"
                            className="w-full py-3 px-4 bg-gray-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center space-x-3 hover:bg-gray-600 transition duration-300"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 12.0017C23.4545 11.2352 23.3809 10.4989 23.2453 9.79102H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                            </svg>
                            <span>
                                Sign in with Google
                            </span>
                        </button>
                    </div>
                    <div className="mt-6 text-center">
                        {method === "login" ? (
                            <p className="text-gray-400">Don't have an account? <button onClick={() => navigate('/register')} className="text-purple-500 hover:underline">Sign up</button></p>
                        ) : (
                            <p className="text-gray-400">Already have an account? <button onClick={() => navigate('/login')} className="text-purple-500 hover:underline">Login</button></p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
