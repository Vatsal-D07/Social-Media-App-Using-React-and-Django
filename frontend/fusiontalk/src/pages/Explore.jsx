import React, { useState } from 'react';
import Post from '../components/Post'; // Import your Post component

const Explore = () => {
  console.log("Explore");
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy posts data
  const posts = [
    { id: 1, user: 'User1', image: '/path/to/image1.jpg', text: 'Post 1', likes: 10, shares: 5, comments: 2 },
    { id: 2, user: 'User2', image: '/path/to/image2.jpg', text: 'Post 2', likes: 20, shares: 10, comments: 5 },
    // Add more posts as needed
  ];

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mx-auto max-w-screen-md">
      <h1 className="text-2xl font-semibold text-white mb-4 text-center">Explore Page</h1>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600"
        />
        <button className="ml-4 bg-[#9A48D0] text-white p-2 rounded-md">
          Search
        </button>
      </div>

      {/* Posts Section */}
      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <p className="text-white text-center">No posts found</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
