import React from 'react';
import { Link } from "react-router-dom";

const CharacterItem = ({ item }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleSpeak = () => {
    window.speechSynthesis.cancel();
    if (!isPlaying) {
      const utterance = new SpeechSynthesisUtterance(item.meaning);
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
      <div className="gita-card">
        <div className="gita-card-header">
          <span className="gita-card-badge">{item.code}</span>
          <h5 className="gita-card-title">{item.name}</h5>
        </div>
        <div className="gita-card-body">
          {item.description && (
            <p className="gita-card-desc">{item.description}</p>
          )}
          <div className="gita-card-meaning">
            <span className="gita-card-meaning-label">Meaning</span>
            <p className="gita-card-meaning-text">{item.meaning}</p>
          </div>
        </div>
        <div className="gita-card-footer">
          <Link to={`/cardview/${item.id}`} className="gita-card-btn">
            Details
          </Link>
          <button
            type="button"
            onClick={handleSpeak}
            className="gita-card-speak"
            aria-label={isPlaying ? "Stop speech" : "Play speech"}
          >
            <i className={isPlaying ? "fa fa-stop" : "fa fa-play"}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
