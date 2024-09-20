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
        // console.log(response.data)
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
            user={post.user}// Assuming response has profilePic
            username={post.user.username}
            postImage={post.image}
            postText={post.text}
            likeCount={post.likes}
            date={post.created_at} // Assuming response has date
            time={post.time} // Assuming response has time
            comments={post.comments}
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
