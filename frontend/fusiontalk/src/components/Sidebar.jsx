import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Sidebar for larger screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1A1B25] text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0 z-30`}
        style={{ zIndex: 30 }}
      >
        <div className="flex items-center p-4 border-b border-gray-700">
          <img src="/path/to/profile.jpg" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
          <span className="text-lg font-semibold">Username</span>
        </div>
        <nav className="mt-6">
          <Link to="/app" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Home</Link>
          <Link to="/app/profile" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Profile</Link>
          <Link to="/app/search" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Search</Link>
          <Link to="/app/explore" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Explore</Link>
          <Link to="/app/settings" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Settings</Link>
          <Link to="/app/messages" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Messages</Link>
          <Link to="/app/create" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Create</Link>
          <Link to="/logout" className="block py-2 px-4 hover:bg-[#9A48D0] transition-colors">Logout</Link>
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
