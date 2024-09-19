import React, { useState, useEffect } from 'react';
import { HeartIcon as HeartIconOutline, BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftIcon, ShareIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AxiosInstance from './Axios';

const Post = ({ id, profilePic, username, postImage, postText, likeCount, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const hasLiked = localStorage.getItem(`liked_post_${id}`);
    if (hasLiked === 'true') {
      setLiked(true);
    }
  }, [id]);

  const handleLikeClick = async () => {
    try {
      const response = await AxiosInstance.post(`/tweet/tweet/${id}/like/`);
      setLikes(response.data.like_count);
      setLiked(response.data.liked);
      localStorage.setItem(`liked_post_${id}`, response.data.liked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleSaveClick = () => setSaved(!saved);
  const handleCommentsToggle = () => setCommentsOpen(!commentsOpen);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`/tweet/tweets/${id}`);
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handlePostClick = () => {
    navigate(`/app/post/${id}`); // Navigate to the detailed view
  };

  return (
    <div className="bg-[#1A1B25] text-white p-4 rounded-lg shadow-lg mb-6 relative">
      <button
        onClick={handleMenuToggle}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <EllipsisVerticalIcon className="w-6 h-6" />
      </button>

      <Transition
        show={menuOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute top-12 right-4 bg-[#25262E] rounded-lg shadow-lg border border-gray-700">
          <button
            onClick={handleDelete}
            className="block px-4 py-2 text-red-500 hover:bg-[#1A1B25] w-full text-left rounded-t-lg"
          >
            Delete
          </button>
        </div>
      </Transition>

      <div className="flex items-center mb-4" onClick={handlePostClick}>
        <img src={profilePic} alt={username} className="w-12 h-12 rounded-full mr-4" />
        <span className="font-semibold">{username}</span>
      </div>

      {postImage && <img src={postImage} alt="Post" className="w-full rounded-lg mb-4" />}

      {postText && <p className="mb-4">{postText}</p>}

      <div className="flex justify-between items-center">
        <button
          onClick={handleLikeClick}
          className={`flex items-center space-x-1 transition-all duration-300 transform ${
            liked ? 'scale-125 text-red-500' : 'hover:text-[#9A48D0] active:scale-90'
          }`}
        >
          {liked ? <HeartIconSolid className="w-6 h-6" /> : <HeartIconOutline className="w-6 h-6" />}
          <span>Like</span>
        </button>

        <button
          onClick={handleCommentsToggle}
          className="flex items-center space-x-1 hover:text-[#9A48D0] active:scale-90 transition-all duration-300"
        >
          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
          <span>Comment</span>
        </button>

        <button className="flex items-center space-x-1 hover:text-[#9A48D0] active:scale-90 transition-all duration-300">
          <ShareIcon className="w-6 h-6" />
          <span>Share</span>
        </button>

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

          <div className="space-y-3">
            <div className="flex items-start">
              <img src={profilePic} alt="Commenter" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <span className="font-semibold">{username}</span>
                <p className="text-sm">This is an awesome post!</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Post;
