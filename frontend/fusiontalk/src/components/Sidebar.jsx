import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, MagnifyingGlassIcon, Cog6ToothIcon, ChatBubbleLeftIcon, PlusCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'; // Update to Heroicons v2
import AxiosInstance from '../components/Axios';
import { USER_ID } from '../constants';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await AxiosInstance.get('/account/profiles/');
        setUser(response.data[0]);
        if (response.data[0].user.id == localStorage.getItem(USER_ID)) {
          setAuthenticated(true);
        }

        // Check if the user is already followed
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black  shadow-2xl rounded-r-3xl transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        } md:translate-x-0 z-30`}
        style={{ zIndex: 30 }}
      >
        <div className="relative flex items-center p-4 border-b border-gray-700 hover:bg-[#c4c4c4] ">
          <img src={user?.image} alt={user?.user.username} className="w-12 h-12 rounded-full mr-4" />
          <span className="text-lg font-semibold text-black">{user?.user.username}</span>
          <button
            className="absolute right-4 p-2 rounded-full  transition-all"
            onClick={() => setShowLogout(!showLogout)}
          >
            <EllipsisHorizontalIcon className="w-6 h-6" />
          </button>
          {showLogout && (
            <div className="absolute right-0 top-full mt-0 bg-[#000000] text-white p-0 rounded-lg shadow-lg">
              <Link to="/logout" className="block py-2 px-4  rounded transition-all">
                Logout
              </Link>
            </div>
          )}
        </div>
        <nav className="mt-6">
          <Link to="/app" className="flex items-center py-7 px-4 hover:bg-[#d5d7da]  rounded hover:rounded-lg transition-all">
            <HomeIcon className="w-6 h-6 mr-2 ml-10" /> Home
          </Link>
          <Link to="/app/profile" className="flex items-center py-5 px-4 hover:bg-[#d5d7da]  rounded hover:rounded-lg transition-all">
            <UserIcon className="w-6 h-6 mr-2 ml-10" /> Profile
          </Link>
          
          <Link to="/app/explore" className="flex items-center py-5 px-4 hover:bg-[#d5d7da]  rounded hover:rounded-lg transition-all">
            <MagnifyingGlassIcon className="w-6 h-6 mr-2 ml-10" /> Explore
          </Link>
          <Link to="/app/community" className="flex items-center py-5 px-4 hover:bg-[#d5d7da]  rounded hover:rounded-lg transition-all">
            <HomeIcon className="w-6 h-6 mr-2 ml-10" /> Community
          </Link>
          
          <Link to="/app/messages" className="flex items-center py-5 px-4 hover:bg-[#d5d7da]  rounded hover:rounded-lg transition-all">
            <ChatBubbleLeftIcon className="w-6 h-6 mr-2 ml-10" /> Messages
          </Link>
          <Link to="/app/create" className="flex items-center py-5 px-4 hover:bg-[#d5d7da]  rounded hover:rounded-lg transition-all">
            <PlusCircleIcon className="w-6 h-6 mr-2 ml-10" /> Create Post
          </Link>
          
        </nav>
      </div>

      {/* Toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-40 p-2 bg-gray-800 text-white md:hidden"
        style={{ zIndex: 40 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
