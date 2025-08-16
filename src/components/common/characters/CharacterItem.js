import React from 'react';
import { Route, Link } from "react-router-dom";
import CardImg from "../../../img/card-img.jpg";

const CharacterItem = ({ item }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleSpeak = () => {
    // Cancel any ongoing speech before starting
    window.speechSynthesis.cancel();

    if (!isPlaying) {
      const utterance = new SpeechSynthesisUtterance(item.meaning);
      window.speechSynthesis.speak(utterance);

      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
      <div className="card card-figure has-hoverable">
        <figure className="figure">
          <div className="figure-img">
            <div style={{ height: '10vw' }}>
              <h6 className="figure-title">{item.name}</h6>
              <p className="text-muted mb-0">
                <small>{item.description}</small>
                <br /><br />
                <small><b>Meaning</b> - <br />{item.meaning}</small>
              </p>
            </div>
            <div className="figure-action">
              <Link to={`/cardview/${item.id}`} className="btn btn-block btn-sm btn-primary">
                Details
              </Link>
            </div>
          </div>
          <figcaption className="figure-caption">
            <ul className="list-inline d-flex text-muted mb-0">
              <li className="list-inline-item text-truncate mr-auto">
                <a href={CardImg} download>
                  <span className="badge badge-info">{item.code}</span>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="#" onClick={handleSpeak}>
                  <span>
                    <i className={isPlaying ? "fa fa-stop-circle-o" : "fa fa-play"}></i>
                  </span>
                </a>
              </li>

              <li className="list-inline-item">
                <a href="#" onClick={handleStop}>
                  <span><i className="fa fa-stop-circle-o"></i></span>
                </a>
              </li>
            </ul>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default CharacterItem;
