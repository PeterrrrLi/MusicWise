import React, { useEffect } from 'react';
import useGetTopRanked from '../hooks/useGetTopRanked';
import useGetTopSpotifyRank from '../hooks/useGetTopSpotifyRank';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
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

    if (fanRankings && spotifyRankings){
        fanRankings.sort((a, b) => {return a.avg_rank <= b.avg_rank ? 1 : -1});
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
                        {fanRankings && fanRankings.map((ranking,index) => (
                            <tr key={ranking.music_ID}>
                                <td>{ranking.music_title}</td>
                                    <td><b># {index+1}</b> 
                                    <span></span>
                                    <span className='purple-text'>
                                        (<FontAwesomeIcon icon={faStar}/> <b>{ranking.avg_rank}</b> by <b>{ranking.rank_count}</b> ratings)
                                        </span>
                                </td>
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
                        {spotifyRankings && spotifyRankings.map((ranking, index) => (
                            <tr key={ranking.music_ID}>
                                <td>{ranking.music_title}</td>
                                <td><b># {index+1}</b></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}

export default Top10Songs;
