import React from "react";
import "./Card.scss";

const Card = ({
  title,
  description,
  imageSrc,
  onClick,
  contents,
  joinCode,
  type,
}) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-contents">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        {type === "join" ? (
          <>
            <label className="join-code-label">참여 코드 입력:</label>
            <input className="join-code-input"></input>
          </>
        ) : (
          joinCode && <p className="join-code">생성된 코드: {joinCode}</p>
        )}
        <button className="card-button" onClick={onClick}>
          {contents}
        </button>
      </div>
    </div>
  );
};

export default Card;
