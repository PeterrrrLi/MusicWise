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
                            <tr key={ranking.artist_id}>
                                <td>{ranking.artist_name}</td>
                                <td>{ranking.avg_rank}</td>
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
                            <tr key={ranking.artist_ID}>
                                <td>{ranking.artist_name}</td>
                                <td>{ranking.avg_ave_rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}

export default Top10Artists;
