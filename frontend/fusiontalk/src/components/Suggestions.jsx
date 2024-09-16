import React from 'react';

const Suggestions = () => {
  const suggestedAccounts = [
    { username: 'john_doe', profilePic: '/path/to/john.jpg' },
    { username: 'jane_doe', profilePic: '/path/to/jane.jpg' },
    { username: 'random_user', profilePic: '/path/to/random.jpg' },
  ];

  return (
    <div className="bg-[#1A1B25] text-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Suggestions for you</h3>
      {suggestedAccounts.map((account, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={account.profilePic} alt={account.username} className="w-10 h-10 rounded-full mr-4" />
          <span className="font-semibold">{account.username}</span>
          <button className="ml-auto bg-[#9A48D0] text-white px-4 py-1 rounded-lg hover:bg-white hover:text-[#9A48D0] transition-colors">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
