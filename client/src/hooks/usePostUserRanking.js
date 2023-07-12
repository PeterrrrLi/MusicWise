import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://top-music-database-app-ff988f7a68fa.herokuapp.com/'


const usePostUserRanking = (musicID, rank) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const postData = async () => {
        setLoading(true);
        setError(null);

        if (musicID) {

            try {
                const response = await axios.post('/insertUserRanking', {musicID: musicID, rank: rank});
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

    };

    return { data, loading, error, postData };
};


export default usePostUserRanking;
