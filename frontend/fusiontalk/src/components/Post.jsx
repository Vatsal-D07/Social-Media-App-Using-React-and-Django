import React, { useState, useEffect } from 'react';
import { HeartIcon as HeartIconOutline, BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftIcon, ShareIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './Axios';

const Post = ({ id, user, profilepic, username, postImage, postText, likeCount, postDate, postTime, comments }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(likeCount ?? 0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [postComments, setPostComments] = useState(comments ?? []);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hasLiked = localStorage.getItem(`liked_post_${id}`);
    if (hasLiked === 'true') setLiked(true);

    const fetchComments = async () => {
      try {
        const response = await AxiosInstance.get('/tweet/comments/by_tweet/', { params: { tweet_id: id } });
        setPostComments(response.data);
      } catch (err) {
        setError('Failed to load comments.');
      }
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        try {
          const response = await AxiosInstance.get(`/account/profiles/?user_id=${user.id}`);
          setProfile(response.data[0]);
        } catch (err) {
          console.error('Error fetching profile:', err.response ? err.response.data : err.message);
          setError('Failed to load profile.');
        }
      }
    };
    fetchProfiles();
  }, [user]);

  const handleLikeClick = async () => {
    try {
      const response = await AxiosInstance.post(`/tweet/tweet/${id}/like/`);
      setLikes(response.data.like_count);
      setLiked(response.data.liked);
      localStorage.setItem(`liked_post_${id}`, response.data.liked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
      setError('Failed to toggle like.');
    }
  };

  const handleSaveClick = async () => {
    try {
      setSaved(!saved);
    } catch (error) {
      console.error('Failed to save post:', error);
      setError('Failed to save post.');
    }
  };

  const handleCommentsToggle = () => setCommentsOpen(!commentsOpen);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`/tweet/tweets/${id}/`);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
      setError('Failed to delete post.');
    }
  };

  const handlePostClick = () => navigate(`/app/post/${id}`);

  const handleCommentInputChange = (e) => setCommentInput(e.target.value);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      const response = await AxiosInstance.post(`/tweet/comments/`, { comment: commentInput, tweet: id });
      setPostComments([...postComments, { ...response.data, profilePic: profilepic, username }]);
      setCommentInput('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      setError('Failed to add comment.');
    }
  };

  return (
    <div className="bg-white text-black py-4 shadow-lg mb-6 mx-14 relative">
      <div className='bg-white p-1 mb-3'>
        {/* Options menu */}
        <button
          onClick={handleMenuToggle}
          className="absolute top-11 right-4 text-gray-400 hover:text-white transition-colors"
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
          <div className="absolute top-20 right-4 bg-[#000000] rounded-lg shadow-lg border border-gray-700">
            <button
              onClick={handleDelete}
              className="block px-4 py-2 text-red-500 hover:bg-[#d7d7d7] w-full text-left rounded-t-lg"
            >
              Delete
            </button>
          </div>
        </Transition>

        {/* Post Header */}
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={handlePostClick}>
          <div className="flex items-center">
            <img
              src={profilepic ? profilepic : profile?.image}
              alt={username}
              className="w-12 h-12 rounded-full mr-8 mt-3 ml-2"
            />
            <span className="font-semibold mt-3">{username}</span>
          </div>
          <div className="text-black sm:flex flex-col text-right mr-10 mt-3">
            <span className="text-xs">{postDate}</span>
            <span className="text-xs">{postTime}</span>
          </div>
        </div>
      </div>

      {/* Post Text and Image */}
      <div className="cursor-pointer" onClick={handlePostClick}>
        {postText && <p className="mb-4 ml-4 text-start">{postText}</p>}
        {postImage && <img src={postImage} alt="Post" className="w-full mb-4" />}
      </div>

      {/* Post Actions */}
      <div className="flex justify-around mt-4">
        <button
          onClick={handleLikeClick}
          className={`flex items-center space-x-1 transition-all duration-300 transform ${liked ? 'scale-125 text-red-500' : 'hover:text-[#276FBF] active:scale-90'}`}
        >
          {liked ? <HeartIconSolid className="w-6 h-6" /> : <HeartIconOutline className="w-6 h-6" />}
          <span className="text-sm">{likes}</span>
        </button>
        <button
          onClick={handleCommentsToggle}
          className="flex items-center space-x-1 transition-all duration-300 hover:text-[#276FBF]"
        >
          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
          <span className="text-xs">Comments</span>
        </button>
        <button
          onClick={handleSaveClick}
          className={`flex items-center space-x-1 transition-all duration-300 ${saved ? 'text-yellow-500' : 'hover:text-[#276FBF]'}`}
        >
          {saved ? <BookmarkIconSolid className="w-6 h-6" /> : <BookmarkIconOutline className="w-6 h-6" />}
          <span className="text-xs">Save</span>
        </button>
        <button className="flex items-center space-x-1 transition-all duration-300 hover:text-[#276FBF]">
          <ShareIcon className="w-6 h-6" />
          <span className="text-xs">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <Transition
        show={commentsOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="mt-4 bg-white p-4 rounded-lg">
          <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4 mb-4">
            <textarea
              value={commentInput}
              onChange={handleCommentInputChange}
              rows="3"
              placeholder="Write a comment..."
              className="w-full p-2 rounded-lg bg-white text-black border border-gray-700 focus:outline-none focus:border-[#276FBF] transition-colors"
            />
            <button type="submit" className="self-end bg-[#276FBF] text-white px-4 py-2 rounded-lg hover:bg-[#02509d]">
              Submit
            </button>
          </form>
          <ul className="space-y-4">
            {postComments.map((comment, index) => (
              <li key={index} className="bg-[#f2f2f2] p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <img
                    src={profilepic}
                    alt={username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold">{comment.username}</span>
                </div>
                <p className="mt-2">{comment.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </Transition>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Post;
