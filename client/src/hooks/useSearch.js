import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://top-music-database-app-ff988f7a68fa.herokuapp.com/'

const useSearch = (term) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/search', { term });
      console.log('Response:', response);  // Add this line
      setData(response.data);
    } catch (error) {
      console.log('Error:', error);  // Add this line
      setError(error);
    }
    setIsLoading(false);
  };
  
  
  useEffect(() => {
    fetchData();
  }, [term]);
  
  return { data, isLoading, error };
};

export default useSearch;
