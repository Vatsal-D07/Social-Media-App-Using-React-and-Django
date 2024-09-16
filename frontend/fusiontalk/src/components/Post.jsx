// src/components/Post.jsx
import React, { useState } from 'react';
import { HeartIcon as HeartIconOutline, BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react'; // For smooth transitions

const Post = ({ profilePic, username, postImage, postText }) => {
  // State to toggle between filled and outlined icons
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false); // State to toggle the comment accordion

  // Toggle functions for like, save, and comments
  const handleLikeClick = () => setLiked(!liked);
  const handleSaveClick = () => setSaved(!saved);
  const handleCommentsToggle = () => setCommentsOpen(!commentsOpen);

  return (
    <div className="bg-[#1A1B25] text-white p-4 rounded-lg shadow-lg mb-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img src={profilePic} alt={username} className="w-12 h-12 rounded-full mr-4" />
        <span className="font-semibold">{username}</span>
      </div>

      {/* Post Image */}
      {postImage && <img src={postImage} alt="Post" className="w-full rounded-lg mb-4" />}

      {/* Post Text */}
      {postText && <p className="mb-4">{postText}</p>}

      {/* Interactions */}
      <div className="flex justify-between items-center">
        {/* Like Button with Toggle */}
        <button
          onClick={handleLikeClick}
          className={`flex items-center space-x-1 transition-all duration-300 transform ${
            liked ? 'scale-125 text-red-500' : 'hover:text-[#9A48D0] active:scale-90'
          }`}
        >
          {liked ? <HeartIconSolid className="w-6 h-6" /> : <HeartIconOutline className="w-6 h-6" />}
          <span>Like</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={handleCommentsToggle}
          className="flex items-center space-x-1 hover:text-[#9A48D0] active:scale-90 transition-all duration-300"
        >
          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
          <span>Comment</span>
        </button>

        {/* Share Button */}
        <button className="flex items-center space-x-1 hover:text-[#9A48D0] active:scale-90 transition-all duration-300">
          <ShareIcon className="w-6 h-6" />
          <span>Share</span>
        </button>

        {/* Save Button with Toggle */}
        <button
          onClick={handleSaveClick}
          className={`flex items-center space-x-1 transition-all duration-300 transform ${
            saved ? 'scale-125 text-green-500' : 'hover:text-[#9A48D0] active:scale-90'
          }`}
        >
          {saved ? <BookmarkIconSolid className="w-6 h-6" /> : <BookmarkIconOutline className="w-6 h-6" />}
          <span>Save</span>
        </button>
      </div>

      {/* Comments Section (Accordion) */}
      <Transition
        show={commentsOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="mt-4 bg-[#25262E] p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>

          {/* Placeholder Comments */}
          <div className="space-y-3">
            <div className="flex items-start">
              <img src={profilePic} alt="Commenter" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <span className="font-semibold">{username}</span>
                <p className="text-sm">This is an awesome post!</p>
              </div>
            </div>
            <div className="flex items-start">
              <img src={profilePic} alt="Commenter" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <span className="font-semibold">{username}</span>
                <p className="text-sm">I really like your content!</p>
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full p-2 rounded-lg bg-[#1A1B25] border border-gray-600 focus:border-[#9A48D0] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Post;
