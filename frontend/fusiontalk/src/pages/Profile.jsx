import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post'; // Import the Post component

const Profile = () => {
  const user = {
    profilePic: '/path/to/profile.jpg',
    username: 'john_doe',
    bio: 'Just a regular guy who loves coding and coffee.',
    followers: 250,
    following: 180,
    posts: [
      {
        id: 1,
        profilePic: '/path/to/profile.jpg',
        username: 'john_doe',
        postImage: '/path/to/post1.jpg',
        postText: 'Enjoying a beautiful day!',
        likeCount: 45,
        postDate: 'Sep 19, 2024',
        postTime: '10:00 AM',
      },
      {
        id: 2,
        profilePic: '/path/to/profile.jpg',
        username: 'john_doe',
        postImage: '/path/to/post2.jpg',
        postText: 'Another great coding session!',
        likeCount: 78,
        postDate: 'Sep 18, 2024',
        postTime: '2:00 PM',
      },
    ],
  };

  return (
    <div className="p-4 md:p-8 bg-[#020202] min-h-screen">
      {/* User Profile Section */}
      <div className="bg-[#1A1B25] text-white p-6 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <img
            src={user.profilePic}
            alt={user.username}
            className="w-24 h-24 rounded-full border-4 border-[#9A48D0] mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left sm:ml-6">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            {/* Followers and Following */}
            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6">
              <div className="text-center">
                <span className="block text-lg font-semibold">{user.followers}</span>
                <span className="hidden sm:block text-gray-400">Followers</span> {/* Hide text on small screens */}
              </div>
              <div className="text-center">
                <span className="block text-lg font-semibold">{user.following}</span>
                <span className="hidden sm:block text-gray-400">Following</span> {/* Hide text on small screens */}
              </div>
            </div>
            <p className="text-gray-400 mt-4">{user.bio}</p>
          </div>
        </div>
        {/* Edit Profile Button */}
        <Link
          to="/app/edit-profile"
          className="block text-center sm:text-center bg-[#9A48D0] hover:bg-[#7a36a3] text-white py-2 px-4 rounded-md"
        >
          Edit Profile
        </Link>
      </div>

      {/* User Posts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {user.posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            profilePic={post.profilePic}
            username={post.username}
            postImage={post.postImage}
            postText={post.postText}
            likeCount={post.likeCount}
            postDate={post.postDate}
            postTime={post.postTime}
            onDelete={(postId) => {
              console.log(`Deleted post with id: ${postId}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
