import React, { useEffect } from 'react';
import useGetTopRanked from '../hooks/useGetTopRanked';
import useGetTopSpotifyRank from '../hooks/useGetTopSpotifyRank';
import './top10Songs.css'

function Top10Songs() {
    const { data: fanRankings, isLoadingFanRank, error1 } = useGetTopRanked();
    const { data: spotifyRankings, isLoadingSpotifyRank, error2 } = useGetTopSpotifyRank();
    if (isLoadingFanRank || isLoadingSpotifyRank) {
        return <p>Loading...</p>;
    }

    if (error1 || error2) {
        return <p>Error occurred: {error1.message} {error2.message} </p>;
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <table style={{ color: 'white' }}>
                    <thead>
                        <tr>
                            <th>Music Title</th>
                            <th>Fan Ranking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fanRankings && fanRankings.map((ranking) => (
                            <tr key={ranking.music_ID}>
                                <td>{ranking.music_title}</td>
                                <td>{ranking.avg_rank} <span> </span> <span className='purple-text'>({ranking.rank_count} ratings)</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table style={{ color: 'white' }}>
                    <thead>
                        <tr>
                            <th>Music Title</th>
                            <th>Spotify Ranking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spotifyRankings && spotifyRankings.map((ranking) => (
                            <tr key={ranking.music_ID}>
                                <td>{ranking.music_title}</td>
                                <td>{ranking.avg_rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}

export default Top10Songs;
