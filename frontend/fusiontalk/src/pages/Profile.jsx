import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AxiosInstance from '../components/Axios';
import Post from '../components/Post';
import { USER_ID } from '../constants';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // State to track follow status
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await AxiosInstance.get('/account/profiles/');
        setUser(response.data[0]);
        if (response.data[0].user.id == localStorage.getItem(USER_ID)) {
          setAuthenticated(true);
        }

        // Check if the user is already followed
        setIsFollowing(fetchedUser.followers.includes(localStorage.getItem(USER_ID)));
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
  }, [user]); // Only run when user is set

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Unfollow the user
        await AxiosInstance.post('/account/profiles/unfollow/', { user_id: user.user.id });
        setIsFollowing(false);
        // Update followers array locally
        setUser((prevUser) => ({
          ...prevUser,
          followers: prevUser.followers.filter(id => id !== localStorage.getItem(USER_ID)),
        }));
      } else {
        // Follow the user
        await AxiosInstance.post('/account/profiles/follow/', { user_id: user.user.id });
        setIsFollowing(true);
        // Update followers array locally
        setUser((prevUser) => ({
          ...prevUser,
          followers: [...prevUser.followers, localStorage.getItem(USER_ID)],
        }));
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-[#020202] min-h-screen">
      <div className="bg-[#1A1B25] text-white p-6 rounded-lg shadow-lg mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center mb-4 ml-6">
          <img
            src={user?.image}
            alt={user?.user.username}
            className="w-24 h-24 rounded-full border-4 border-[#9A48D0] mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left sm:ml-6 flex-1">
            <h1 className="flex justify-between text-2xl font-bold ml-16 p-1 pl-3 bg-slate-700 rounded-xl">{user?.user.username}
            {authenticated && (
                  <button
                  onClick={() => navigate('/app/edit-profile', { state: { user } })}
                  className="flex items-center text-white"
                  aria-label="Edit Profile"
                >
                  <FaEdit  />
                </button>
                )}
            </h1>
            {/* Followers, Following, and Post Count */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex-1 text-center">
                <span className="block text-lg font-semibold">{posts.length}</span>
                <span className="hidden sm:block text-gray-400">Posts</span>
              </div>
              <div className="flex-1 text-center">
                <span className="block text-lg font-semibold">{user?.followers.length}</span>
                <span className="hidden sm:block text-gray-400">Followers</span>
              </div>
              <div className="flex-1 text-center">
                <span className="block text-lg font-semibold">{user?.following.length}</span>
                <span className="hidden sm:block text-gray-400">Following</span>
              </div>
              <div className="flex items-center flex-1 justify-center">
                <button
                  onClick={handleFollowToggle}
                  className={`bg-[#9A48D0] hover:bg-[#7a36a3] text-white py-2 px-4 rounded-md`}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                {/* Edit Icon next to Follow Button */}
                
              </div>
            </div>
            <p className="text-gray-400 mt-4">{user?.bio}</p>
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          // Convert created_at to Date object
          const postDate = new Date(post.created_at);
          const formattedDate = postDate.toLocaleDateString(); // Get the date
          const formattedTime = postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get the time

          return (
            <Post
              key={post.id}
              id={post.id}
              profilePic={user.image}
              username={post.user.username}
              postImage={post.image}
              postText={post.text}
              likeCount={post.likes}
              postDate={formattedDate} // Pass the formatted date
              postTime={formattedTime} // Pass the formatted time
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
