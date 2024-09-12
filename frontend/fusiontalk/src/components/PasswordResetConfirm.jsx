import React, { useState } from 'react';
import AxiosInstance from './Axios';
import { useParams } from 'react-router-dom';

const PasswordResetConfirm = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { uidb64, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before starting the request
        try {
            const response = await AxiosInstance.post('/account/password_reset_confirm/', { 
                password, 
                uidb64, 
                token 
            });
            setMessage(response.data.message);
        } catch (error) {
            console.log(error)
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    return (
        <div>
            <h2>Set New Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    placeholder="Enter your new password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={loading}>Reset Password</button>
            </form>
            {loading && <p>Loading...</p>} {/* Display loading message or spinner */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default PasswordResetConfirm;
