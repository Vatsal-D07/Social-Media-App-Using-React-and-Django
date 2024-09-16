// src/pages/Profile.jsx
import React from 'react';
import Post from '../components/Post'; // Assuming the Post component is used here

const Profile = () => {
  // Sample user data
  const user = {
    profilePic: '/path/to/profile.jpg',
    username: 'john_doe',
    bio: 'Just a regular guy who loves coding and coffee.',
    followers: 250,
    following: 180,
    posts: [
      {
        id: 1,
        profilePic: '/path/to/profile1.jpg',
        username: 'john_doe',
        postImage: '/path/to/post1.jpg',
        postText: 'Enjoying a beautiful day!',
      },
      {
        id: 2,
        profilePic: '/path/to/profile2.jpg',
        username: 'john_doe',
        postImage: '/path/to/post2.jpg',
        postText: 'Had a great time at the park.',
      },
      {
        id: 3,
        profilePic: '/path/to/profile2.jpg',
        username: 'john_doe',
        postImage: '/path/to/post2.jpg',
        postText: 'Had a great time at the park.',
      },
      {
        id: 4,
        profilePic: '/path/to/profile2.jpg',
        username: 'john_doe',
        postImage: '/path/to/post2.jpg',
        postText: 'Had a great time at the park.',
      },
      {
        id: 5,
        profilePic: '/path/to/profile2.jpg',
        username: 'john_doe',
        postImage: '/path/to/post2.jpg',
        postText: 'Had a great time at the park.',
      },
      // Add more posts as needed
    ]
  };

  return (
    <div className="p-4 md:p-8 bg-[#020202] min-h-screen">
      {/* User Profile Section */}
      <div className="bg-[#1A1B25] text-white p-6 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto">
        <div className="flex items-center mb-4">
          <img src={user.profilePic} alt={user.username} className="w-24 h-24 rounded-full border-4 border-[#9A48D0]" />
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            {/* Followers and Following at the top */}
            <div className="mt-4 flex space-x-6">
              <div className="text-center">
                <span className="block text-lg font-semibold">{user.followers}</span>
                <span className="text-gray-400">Followers</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-semibold">{user.following}</span>
                <span className="text-gray-400">Following</span>
              </div>
            </div>
            {/* Bio now at the bottom */}
            <p className="text-gray-400 mt-6">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {user.posts.map(post => (
          <Post
            key={post.id}
            profilePic={post.profilePic}
            username={post.username}
            postImage={post.postImage}
            postText={post.postText}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
