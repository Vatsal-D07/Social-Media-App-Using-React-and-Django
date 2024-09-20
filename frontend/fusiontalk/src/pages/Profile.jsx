import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import Post from '../components/Post'; // Import the Post component
import { USER_ID } from '../constants';

const Profile = () => {
  const [user, setUser] = useState(null); // Start with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  const [authenticated,setAuthenticated]=useState(false)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await AxiosInstance.get('/account/profiles/');
        setUser(response.data[0]);
        if(response.data[0].user.id == localStorage.getItem(USER_ID)) {
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
          // console.log(response.data)
          setPosts(response.data);
        } catch (err) {
          console.error('Error fetching tweets:', err.response ? err.response.data : err.message);
          setError('Failed to load tweets');
        }
      }
    };
  
    fetchPosts();
  }, [user]); // Only run when user is set
  

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (!user) {
    return <div>No user data found.</div>; // Handle case where user data is not found
  }
  console.log(posts)

  return (
    <div className="p-4 md:p-8 bg-[#020202] min-h-screen">
      {/* User Profile Section */}
      <div className="bg-[#1A1B25] text-white p-6 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <img
            src={user?.image} // Access image property only when user is not null
            alt={user?.user.username} // Use the correct alt text
            className="w-24 h-24 rounded-full border-4 border-[#9A48D0] mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left sm:ml-6">
            <h1 className="text-2xl font-bold">{user?.user.username}</h1>
            {/* Followers and Following */}
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
        {/* Edit Profile Button */}
        {authenticated ? <Link
          to="/app/edit-profile"
          className="block text-center sm:text-center bg-[#9A48D0] hover:bg-[#7a36a3] text-white py-2 px-4 rounded-md"
        >
          Edit Profile
        </Link>: null}
        
      </div>

      {/* User Posts Section */}
      {/* Uncomment and adjust if you have posts data */}
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
