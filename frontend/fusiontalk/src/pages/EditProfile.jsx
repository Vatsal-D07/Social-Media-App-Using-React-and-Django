import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    console.log("EditProfile component rendered");

    const [user, setUser] = useState({
        profilePic: '/path/to/profile.jpg',
        username: 'john_doe',
        bio: 'Just a regular guy who loves coding and coffee.',
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser({ ...user, profilePic: URL.createObjectURL(file) });
        }
    };

    const handleSave = () => {
        console.log('Profile updated', user);
    };

    return (
        <div className="p-6 md:p-12 bg-[#020202] min-h-screen flex items-center justify-center relative">
            <div className="bg-[#1A1B25] text-white p-6 md:p-10 rounded-lg shadow-lg max-w-2xl w-full relative">
                {/* Cross Button in Top Right Corner */}
                <button
                    onClick={() => navigate('/app/profile')}
                    className="absolute top-4 right-4 text-[#9A48D0] hover:text-[#7a36a3] text-3xl"
                >
                    &times; {/* HTML entity for multiplication sign (cross) */}
                </button>
                
                <div className="min-w-full text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#9A48D0]">Edit Your Profile</h1>
                </div>

                {/* Profile Picture Section */}
                <div className="flex items-center justify-center mb-8">
                    <img
                        src={user.profilePic}
                        alt={user.username}
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
                        value={user.username}
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
