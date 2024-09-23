import React, { useEffect, useState } from 'react';
import Post from '../components/Post'; // Import your Post component
import AxiosInstance from '../components/Axios';

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await AxiosInstance.get('/tweet/tweets/');
        setPosts(response.data); // Assuming the data is an array of tweet objects
      } catch (err) {
        console.error('Error fetching tweets:', err.response ? err.response.data : err.message);
        setError('Failed to load tweets');
      }
    };
    fetchPosts();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 mx-auto max-w-screen-md">
      <h1 className="text-2xl font-semibold text-black mb-4 text-center">Explore Page</h1>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 bg-[#dedede] text-black rounded-md border border-gray-600"
        />
        <button className="ml-4 bg-[#276FBF] text-white p-2 rounded-md">
          Search
        </button>
      </div>

      {/* Posts Section */}
      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => {
            // Extracting and formatting date and time
            const createdAt = new Date(post.created_at);
            const date = createdAt.toLocaleDateString(); // Format date as needed
            const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as needed

            return (
              <Post
                key={post.id}
                id={post.id}
                user={post.user}
                username={post.user.username}
                postImage={post.image}
                postText={post.text}
                likeCount={post.likes}
                postDate={date} // Pass formatted date
                postTime={time} // Pass formatted time
                comments={post.comments}
              />
            );
          })
        ) : (
          <p className="text-white text-center">No posts found</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
