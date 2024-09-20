import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import Post from '../components/Post';
import { USER_ID } from '../constants';
import { PencilIcon } from '@heroicons/react/24/solid'; // Import the pencil icon

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await AxiosInstance.get('/account/profiles/');
        setUser(response.data[0]);
        if (response.data[0].user.id == localStorage.getItem(USER_ID)) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          const response = await AxiosInstance.get(`/tweet/tweets/?user_id=${user.user.id}`);
          setPosts(response.data);
        } catch (err) {
          console.error('Error fetching tweets:', err.response ? err.response.data : err.message);
          setError('Failed to load tweets');
        }
      }
    };

    fetchPosts();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-[#020202] min-h-screen">
      <div className="bg-[#1A1B25] text-white p-6 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <img
            src={user?.image}
            alt={user?.user.username}
            className="w-24 h-24 rounded-full border-4 border-[#9A48D0] mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left sm:ml-6 w-full">
            {/* Container for username and edit button */}
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="text-2xl font-bold">{user?.user.username}</h1>
              {/* Edit Profile Button with Pencil Icon (No Background Color) */}
              {authenticated && (
                <button
                  onClick={() => navigate('/app/edit-profile', { state: { user } })}
                  className="flex items-center text-white"
                  aria-label="Edit Profile"
                >
                  <PencilIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6">
              <div className="text-center">
                <span className="block text-lg font-semibold">{user?.followers.length}</span>
                <span className="hidden sm:block text-gray-400">Followers</span>
              </div>
              <div className="text-center">
                <span className="block text-lg font-semibold">{user?.following.length}</span>
                <span className="hidden sm:block text-gray-400">Following</span>
              </div>
            </div>
            <p className="text-gray-400 mt-4">{user?.bio}</p>
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            profilePic={user.image}
            username={post.user.username}
            postImage={post.image}
            postText={post.text}
            likeCount={post.likes}
            postDate={post.created_at}
            postTime={post.postTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
