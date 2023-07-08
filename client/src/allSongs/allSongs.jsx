import React, { useEffect } from 'react';
import useGetTopRanked from '../hooks/useGetTopRanked';
import './allSongs.css'

function AllSongs() {
    const { data: rankings, isLoading, error } = useGetTopRanked();
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error occurred: {error.message}</p>;
    }

    return (
        <>{
            <table style={{ color: 'white' }}>
                <thead>
                <tr>
                    <th>Music ID</th>
                    <th>Rank</th>
                </tr>
                </thead>
                <tbody>
                    {rankings && rankings.map((ranking) => (
                        <tr key={ranking.music_ID}>
                            <td>{ranking.music_ID}</td>
                            <td>{ranking.avg_rank}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        </>
    );
}

export default AllSongs;
