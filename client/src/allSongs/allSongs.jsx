import React, { useEffect } from 'react';
import useGetAllSongs from '../hooks/useGetAllSongs';
import './allSongs.css'

function AllSongs() {
    const { data: allSongs, isLoadingAllSongs, error } = useGetAllSongs();
    if (isLoadingAllSongs) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error occurred: {error.message} </p>;
    }

    allSongs && console.log(allSongs)

    return (
        <>
            <div style={{ display: 'flex' }}>
                <table style={{ color: 'white' }}>
                    <thead>
                        <tr>
                            <th>Music Title</th>
                            <th>Artist Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSongs && allSongs.map((song) => (
                            <tr key={song.music_ID}>
                                <td>{song.music_title}</td>
                                <td>{song.artist_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );
}

export default AllSongs;
