import React, { useState ,useEffect} from 'react';
import AxiosInstance from './Axios';

const Suggestions = () => {
  const [profiles,setProfiles]=useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchProfileData = async () => {
      try {
        const response = await AxiosInstance.get('/account/profiles/',{params:{'all':'true'}});
        console.log(response.data)
        setProfiles(response.data);
      } catch (error) {
        setError(error)
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

  fetchProfileData();
  },[])
  

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }
  return (
    <div className="bg-[#1A1B25] text-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Suggestions for you</h3>
      {profiles.map((account, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={account.image} alt={account.user.username} className="w-10 h-10 rounded-full mr-4" />
          <span className="font-semibold">{account.user.username}</span>
          <button className="ml-auto bg-[#9A48D0] text-white px-4 py-1 rounded-lg hover:bg-white hover:text-[#9A48D0] transition-colors">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
