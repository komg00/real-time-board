import React, { useState } from "react";
import "./Card.scss";

const Card = ({
  title,
  description,
  imageSrc,
  onClick,
  type,
  errorMessage,
}) => {
  const [inputCode, setInputCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleClick = async () => {
    if (type === "create") {
      const roomId = await onClick(); // 방 생성
      setGeneratedCode(roomId); // 생성된 방 코드 표시
    } else if (type === "join") {
      const isSuccess = await onClick(inputCode); // 참여 코드 검증 및 이동
      if (!isSuccess) setInputCode(""); // 실패 시 입력 초기화
    }
  };

  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-contents">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        {type === "join" ? (
          <>
            <label className="join-code-label">참여 코드 입력:</label>
            <input
              className="join-code-input"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="코드 입력"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        ) : (
          generatedCode && (
            <p className="join-code">생성된 코드: {generatedCode}</p>
          )
        )}
        <button className="card-button" onClick={handleClick}>
          {type === "create" ? "생성하기" : "참여하기"}
        </button>
      </div>
    </div>
  );
};

export default Card;
