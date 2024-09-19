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
        {posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            profilePic={post.profilePic} // Assuming response has profilePic
            username={post.user}
            postImage={post.image}
            postText={post.text}
            likeCount={post.likes}
            date={post.date} // Assuming response has date
            time={post.time} // Assuming response has time

          />
        ))}
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
