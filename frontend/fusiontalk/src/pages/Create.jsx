import React, { useState } from 'react';
import AxiosInstance from '../components/Axios'; // Adjust the import path as needed

const Create = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
    setError('');
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // Store the file object, not the URL
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text && !image) {
      setError('Please add some text or upload an image to create a post.');
      return;
    }
    
    const formData = new FormData();

    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await AxiosInstance.post('/tweet/tweets/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      setSuccessMessage('Post created successfully!');
      setText('');
      setImage(null);
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#ffffff] min-h-screen">
      <div className="bg-[#ffffff] text-black  p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="What's on your mind?"
            rows="4"
            className="w-full p-3 rounded-lg bg-[#d5d5d5] border border-gray-600 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9A48D0] transition-all duration-300"
          />
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 ${image ? 'hidden' : 'block'}`}>
              <span>Upload an image</span>
            </div>
            {image && (
              <img
                src={URL.createObjectURL(image)} // Use createObjectURL to show the image preview
                alt="Selected"
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#276FBF] text-white p-3 rounded-lg hover:bg-[#276FBF] transition-all duration-300 active:scale-95"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
