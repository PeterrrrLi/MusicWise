import React, { useState } from 'react';
import Modal from 'react-modal';
import './SongModal.css';

const SongModal = ({ isOpen, onRequestClose, songData }) => {
  const [rank, setRank] = useState(0);

  const handleRankChange = (event) => {
    setRank(event.target.value);
  };

  const submitRank = () => {
    console.log(`Rank for ${songData.music_title}: ${rank}`);
    // rank functionality
  };

  if (!songData) return null;

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
      <h2>{songData.music_title}</h2>
      <p>Music ID: {songData.music_ID}</p>
      <p>Artist Name: {songData.artist_name}</p>
      <div className="rank-input">
        <input
          type="number"
          min="1"
          max="10"
          value={rank}
          onChange={handleRankChange}
        />
        <button onClick={submitRank}>Submit Rank</button>
      </div>
      <button className="close-button" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

export default SongModal;
