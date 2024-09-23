import React, { useState } from 'react';

const Community = () => {
  console.log("Community")
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy community data
  const communities = [
    { id: 1, title: 'React Enthusiasts', description: 'A place for React developers to share knowledge and collaborate.' },
    { id: 2, title: 'Web Dev Collective', description: 'Discuss all things web development, from front-end to back-end.' },
    { id: 3, title: 'Python Programmers', description: 'For those who love Python and want to discuss projects, tips, and tricks.' },
    // Add more communities as needed
  ];

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter communities based on search term
  const filteredCommunities = communities.filter(community =>
    community.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-12 mx-auto max-w-screen-lg">
      <h1 className="text-2xl sm:text-3xl font-semibold text-black mb-4">Community Page</h1>
      
      {/* Input and Button in Flex Container */}
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          placeholder="Search communities..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 bg-[#e4e4e4] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#9A48D0]"
        />
        <button
          type="button"
          className="bg-[#276FBF] text-white px-4 py-2 rounded-md hover:bg-[#276FBF] focus:outline-none focus:ring-2 focus:ring-[#7a2ea0]"
        >
          Search
        </button>
      </div>

      {/* Community Listings */}
      <div className="space-y-6">
        {filteredCommunities.map(community => (
          <div key={community.id} className="bg-[#ffffff] text-black p-4 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{community.title}</h2>
            <p className="mb-4 text-sm sm:text-base">{community.description}</p>
            <button className="bg-[#276FBF] text-white px-4 py-2 rounded-md hover:bg-[#276FBF] focus:outline-none focus:ring-2 focus:ring-[#7a2ea0]">
              Join Community
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
