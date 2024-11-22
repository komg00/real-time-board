import React from "react";
import "./Card.scss";

const Card = ({ title, description, buttonText, imageSrc }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-contents">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
