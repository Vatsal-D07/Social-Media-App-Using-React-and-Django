import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Create from '../pages/Create';
import Explore from '../pages/Explore';
import Home from '../pages/Home';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import PostDetail from '../pages/PostDetails';
import EditProfile from '../pages/EditProfile';
import Community from '../pages/Community';
const MainContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`inset-0 absolute flex-grow bg-[#FDFFFC] transition-all duration-300 ${
        isSidebarOpen ? 'ml-0' : 'md:ml-48'
      } ${!isSidebarOpen && 'md:pl-16'} ${
        isSidebarOpen ? 'md:pl-0' : ''
      }`}
      style={{ minHeight: '100vh', overflowY: 'auto' }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/create" element={<Create />} />
        <Route path="/app/post/:id" element={<PostDetail />} /> 
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/community" element={<Community />} /> 
        <Route path="/post/:id" element={<PostDetail />} /> 

      </Routes>
    </div>
  );
};

export default MainContent;
