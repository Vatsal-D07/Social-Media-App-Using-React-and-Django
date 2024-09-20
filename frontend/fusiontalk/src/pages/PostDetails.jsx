import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import Post from '../components/Post'; // Import Post component

const PostDetail = () => {
  const [user, setUser] = useState(null); // Start with null
  const { id } = useParams(); // Extract the ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AxiosInstance.get(`/tweet/tweets/${id}`);
        setUser(response.data.user);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err.response ? err.response.data : err.message);
        setError('Failed to load post');
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        try {
          const response = await AxiosInstance.get(`/account/profiles/?user_id=${user.id}`);
          setProfile(response.data[0]);
        } catch (err) {
          console.error('Error fetching profiles:', err.response ? err.response.data : err.message);
          setError('Failed to load profiles');
        }
      }
    };

    fetchProfiles();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // Extract and format the date and time
  const createdAt = new Date(post.created_at);
  const date = createdAt.toLocaleDateString(); // Format date as needed
  const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as needed

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <Post
          id={post.id}
          profilepic={profile?.image}
          username={post.user.username}
          postImage={post.image}
          postText={post.text}
          likeCount={post.like_count}
          postDate={date} // Pass formatted date
          postTime={time} // Pass formatted time
        />
      </div>
    </div>
  );
};

export default PostDetail;
