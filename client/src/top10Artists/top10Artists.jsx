import React, { useEffect } from 'react';
import useGetTopArtists from '../hooks/useGetTopArtists';
import useGetTopSpotifyArtists from '../hooks/useGetTopSpotifyArtists';
import './top10Artists.css'

function Top10Artists() {
    const { data: fanRankings, isLoadingFanRank, error1 } = useGetTopArtists();
    const { data: spotifyRankings, isLoadingSpotifyRank, error2 } = useGetTopSpotifyArtists();
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
                            <th>Fan Ranking</th>
                            <th>Artist Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fanRankings && fanRankings.map((ranking, index) => (
                            <tr key={ranking.artist_id}>
                                <td><b>{index+1}</b> <span> </span> <span className='purple-text'>(rating: {ranking.avg_rank})</span></td>
                                <td>{ranking.artist_name} </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <table style={{ color: 'white' }}>
                    <thead>
                        <tr>
                            <th>Spotify Ranking</th>
                            <th>Artist Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spotifyRankings && spotifyRankings.map((ranking, index) => (
                            <tr key={ranking.artist_ID}>
                                <td><b>{index+1}</b> <span> </span> <span className='purple-text'>(avg position: {ranking.avg_ave_rank})</span></td>
                                <td>{ranking.artist_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}

export default Top10Artists;
