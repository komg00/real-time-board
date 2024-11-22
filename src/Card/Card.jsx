import React from "react";
import "./Card.scss";

const Card = ({ title, description, imageSrc, onClick }) => {
  return (
    <div className="card" onClick={onClick} ssss>
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-contents">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
