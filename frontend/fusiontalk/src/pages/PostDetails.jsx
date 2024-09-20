import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import Post from '../components/Post'; // Import Post component

const PostDetail = () => {
  const [user, setUser] = useState(null); // Start with null
  const { id } = useParams(); // Extract the ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [profile,setProfile]=useState(null);
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await AxiosInstance.get(`/tweet/tweets/${id}`);
        // console.log(response.data.user)
        setUser(response.data.user)
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
        // console.log(user)
        try {
          const response = await AxiosInstance.get(`/account/profiles/?user_id=${user.id}`);
          // console.log(response.data[0])  
          setProfile(response.data[0]);
        } catch (err) {
          console.error('Error fetching tweets:', err.response ? err.response.data : err.message);
          setError('Failed to load tweets');
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
  // console.log(profile)
  // Pass the necessary data to the Post component as props
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <Post
          id={post.id}
          profilepic={profile?.image} // Assuming the post contains user details
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
