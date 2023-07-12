import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './SongModal.css';
import usePostUserRanking from '../hooks/usePostUserRanking';

const SongModal = ({ isOpen, onRequestClose, songData }) => {
  const [rank, setRank] = useState(0);
  const { data, isLoading, isError , postData} = usePostUserRanking(songData?.music_ID || null, rank);

  const handleRankChange = (event) => {
    setRank(event.target.value);
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Song Details"
      className="Modal"
      overlayClassName="Overlay"
      portalClassName="CustomModalPortal" 
      ariaHideApp={false} 
    >
      <h2>{songData?.music_title}</h2>
      <p>Music ID: {songData?.music_ID}</p>
      <p>Artist Name: {songData?.artist_name}</p>
      <div className="rank-input">
        <input
          type="number"
          min="1"
          max="10"
          value={rank}
          onChange={handleRankChange}
        />
        <button onClick={postData}>Submit Rank</button>
      </div>
      <button className="close-button" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

export default SongModal;
