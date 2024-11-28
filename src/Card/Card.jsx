import React from "react";
import "./Card.scss";

const Card = ({ title, description, imageSrc, onClick, contents }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-contents">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button className="card-button" onClick={onClick}>
          {contents}
        </button>
      </div>
    </div>
  );
};

export default Card;
