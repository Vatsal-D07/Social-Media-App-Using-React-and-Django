import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import Suggestions from '../components/Suggestions';
import AxiosInstance from '../components/Axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await AxiosInstance.get('/tweet/tweets/');
        setPosts(response.data); // Assuming the data is an array of tweet objects
        console.log(response.data[0].likes.length)
      } catch (err) {
        console.error('Error fetching tweets:', err.response ? err.response.data : err.message);
        setError('Failed to load tweets');
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-between">
      {/* Left - Posts Section */}
      <div className="w-full md:w-2/3 lg:w-3/5 p-4">
        {posts.slice().reverse().map(post => {
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
              likeCount={post.likes.length}
              postDate={date} // Pass formatted date
              postTime={time} // Pass formatted time
              comments={post.comments}
            />
          );
        })}
      </div>

      {/* Right - Suggestions Section */}
      <div className="hidden md:block w-1/3 lg:w-2/5 p-4">
        <div className="sticky top-4"> {/* Sticky class with a top margin */}
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Home;
