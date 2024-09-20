import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AxiosInstance from '../components/Axios';

const EditProfile = () => {
    const location = useLocation();
    
    // Initialize user from location state or default values
    const [user, setUser] = useState(location.state?.user || {
        image: null, // Initialize image as null, no preview needed
        user: {
            username: 'Username',
            bio: 'Add a bio here.',
        },
    });

    console.log(user);

    // Handle input changes for fields like username and bio
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value // Update nested fields
        });
    };

    // Handle profile picture change (store the file itself)
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        console.log()
        if (file) {
            setUser({ ...user, image: file }); // Directly store the file object
        }
    };

    // Handle save (logging the updated user data for now)
    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('username', user.user.username);
            formData.append('bio', user.user.bio);
            
            // Append the image file only if a new image was selected
            if (user.image) {
                formData.append('image', user.image);
            }
            
            console.log(formData.get('image'));
            
            const response = await AxiosInstance.put(`/account/profiles/update-profile/${user.user.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure this header is set for file uploads
                },
            });
            console.log('Profile updated', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="p-6 md:p-12 bg-[#020202] min-h-screen flex items-center justify-center">
            <div className="bg-[#1A1B25] text-white p-6 md:p-10 rounded-lg shadow-lg max-w-2xl w-full">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#9A48D0]">Edit Your Profile</h1>
                
                {/* Profile Picture Section */}
                <div className="flex items-center justify-center mb-8">
                    {/* If user.image is null, show a placeholder image */}
                    <img
                        src={user.image}
                        alt={user.user.username}
                        className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#9A48D0] shadow-md"
                    />
                    {/* Custom Upload Button */}
                    <div className="ml-4">
                        <input
                            type="file"
                            id="profilePic"
                            onChange={handleProfilePicChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="profilePic"
                            className="bg-[#9A48D0] hover:bg-[#7a36a3] text-white py-2 px-4 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#7a36a3]"
                        >
                            Upload New Image
                        </label>
                    </div>
                </div>

                {/* Username Input */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-white mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.user.username}
                        onChange={handleChange}
                        className="w-full bg-[#1A1B25] border-2 border-[#9A48D0] text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#9A48D0] rounded-md"
                        placeholder="Enter your username"
                    />
                </div>

                {/* Bio Input */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-white mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={user.bio}
                        onChange={handleChange}
                        className="w-full bg-[#1A1B25] border-2 border-[#9A48D0] text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#9A48D0] rounded-md"
                        rows="4"
                        placeholder="Tell us something about yourself..."
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full bg-[#9A48D0] hover:bg-[#7a36a3] text-white py-3 px-4 rounded-md text-lg font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#7a36a3]"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
