import React, { useState } from 'react';
import Modal from 'react-modal';
import './SongModal.css';
import usePostUserRanking from '../hooks/usePostUserRanking';
import flameImage from '../resorce/flame.png';

const SongModal = ({ isOpen, onRequestClose, songData }) => {
  const [rank, setRank] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { data, isLoading, isError , postData} = usePostUserRanking(songData?.music_ID || null, rank);

  const handleRankChange = (event) => {
    setRank(event.target.value);
  };

  const handleSubmit = () => {
    postData();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Song Details"
      className="Modal"
      overlayClassName="Overlay"
      portalClassName="Portal" 
      ariaHideApp={false} 
    >
      <div className="content-area">
        <h1>{songData?.music_title}</h1>
        <p className="subtitle">Artist: {songData?.artist_name}</p>
        <div className="rank-input">
          <input
            type="number"
            min="1"
            max="10"
            value={rank}
            onChange={handleRankChange}
          />
          <button className="rank-button" onClick={handleSubmit}>Submit Rank</button>
        </div>
        {!submitted && <p className="rank-reminder">Give it a rank! Remember, 1 is low, 10 is high.</p>}
        {submitted && <p className="submitted-message">Rank submitted successfully!</p>}
      </div>
      <img src={flameImage} alt="flame" className="flame-img"/>
      <button className="close-button" onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SongModal;
