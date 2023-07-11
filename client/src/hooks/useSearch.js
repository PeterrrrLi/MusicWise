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
      var response = await axios.get('/search', {
        params: {
          term
        }
      });
      console.log('Response:', response);
      if (response) {
        setData(response.data);
      } else {
        throw new Error('No response received from server.');
      }
    } catch (error) {
      console.log('Error:', error);
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
