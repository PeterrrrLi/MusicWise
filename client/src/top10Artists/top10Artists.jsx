import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useGetTopArtists from '../hooks/useGetTopArtists';
import useGetTopSpotifyArtists from '../hooks/useGetTopSpotifyArtists';
import './top10Artists.css'
import StarRatingComponent from 'react-star-rating-component';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons'


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
                            <th>Artist Name</th>
                            <th>Fan Ranking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fanRankings && fanRankings.map((ranking, index) => (
                            <tr key={ranking.artist_id}>
                                <td>{ranking.artist_name} </td>
                                <td><b># {index+1}</b> 
                                    <span> </span>
                                    <StarRatingComponent 
                                            className="star-comp"
                                            name="rate2" 
                                            editing={false}
                                            renderStarIcon={() => <span><FontAwesomeIcon icon={faStar} /></span>}
                                            renderStarIconHalf={() => <span className='purple-text'><FontAwesomeIcon icon={faStarHalf} /></span>}
                                            starCount={5}
                                            starColor={"#72689D"}
                                            value={ranking.avg_rank/2}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table style={{ color: 'white' }}>
                    <thead>
                        <tr>
                            <th>Artist Name</th>
                            <th>Spotify Ranking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spotifyRankings && spotifyRankings.map((ranking, index) => (
                            <tr key={ranking.artist_ID}>
                                <td>{ranking.artist_name}</td>
                                <td><b># {index+1}</b> <span> </span> <span className='purple-text'>(avg position: {ranking.avg_ave_rank})</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}

export default Top10Artists;
