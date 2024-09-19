import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import Post from '../components/Post'; // Import Post component

const PostDetail = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AxiosInstance.get(`/tweet/tweets/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err.response ? err.response.data : err.message);
        setError('Failed to load post');
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // Pass the necessary data to the Post component as props
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <Post
          id={post.id}
          profilePic={post.user.profile_pic} // Assuming the post contains user details
          username={post.user.username}
          postImage={post.image}
          postText={post.text}
          likeCount={post.like_count}
        />
      </div>
    </div>
  );
};

export default PostDetail;
