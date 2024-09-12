import React, { useState } from 'react';
import AxiosInstance from './Axios';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await AxiosInstance.post('/account/password_reset/', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <h2>Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordReset;
