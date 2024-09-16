// src/pages/Home.jsx
import React from 'react';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';

const Home = () => {
  const posts = [
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
      username: 'jane_doe',
      postImage: '/path/to/post2.jpg',
      postText: 'Had a great time at the park.',
    },
    // Add more posts as needed
  ];

  return (
    <div className="flex justify-between">
      {/* Left - Posts Section */}
      <div className="w-full md:w-2/3 lg:w-3/5 p-4">
        {posts.map(post => (
          <Post
            key={post.id}
            profilePic={post.profilePic}
            username={post.username}
            postImage={post.postImage}
            postText={post.postText}
          />
        ))}
      </div>

      {/* Right - Suggestions Section */}
      <div className="hidden md:block w-1/3 lg:w-2/5 p-4">
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
