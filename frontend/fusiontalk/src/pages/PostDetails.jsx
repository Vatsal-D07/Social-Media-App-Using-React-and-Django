import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../components/Axios';

const PostDetail = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AxiosInstance.get(`http://127.0.0.1:8000/tweet/tweets/${id}`);
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

  // Safely access properties and provide fallback for arrays like likes and comments
  const { username, image, text, likes = [], comments = [], shares = 0 } = post;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{username}</h1>
      {image && <img src={image} alt="Post" className="w-full rounded-lg mb-4" />}
      <p className="mb-4">{text}</p>
      
      {/* Likes, Comments, and Shares */}
      <div className="flex justify-between items-center mb-4">
        <span>{likes.length} Likes</span>
        <span>{comments.length} Comments</span>
        <span>{shares} Shares</span>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-700 py-2">
              <p className="text-sm font-bold">{comment.user}</p>
              <p className="text-sm">{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
