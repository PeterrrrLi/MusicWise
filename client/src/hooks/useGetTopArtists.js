import { useEffect, useState } from 'react';
import axios from 'axios';

// axios.defaults.baseURL = 'https://top-music-database-app-ff988f7a68fa.herokuapp.com/'
axios.defaults.baseURL = "http://localhost:8080/"

const useGetTopArtists = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    console.log(data)
    setIsLoading(true);
    try {
      var response = await axios.get('/getTop10');
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setData(response.data);
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return { data, isLoading, error };
};

export default useGetTopArtists;
