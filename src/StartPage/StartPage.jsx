import React, { useState } from "react";
import "./StartPage.scss";
import Card from "../Card/Card";
import create_space from "../resources/images/create-space.png";
import join_space from "../resources/images/join-space.png";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const [joinCode, setJoinCode] = useState(""); // 참여 코드 입력 값
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/room");
      const data = await response.json();
      console.log("New Room ID:", data.roomId);
      alert("생성된 코드는 " + data.roomId + " 입니다");
    } catch (error) {
      console.error("방 생성 오류:", error);
    }
  };

  // 방 참여 함수 (유효성 검증 후 이동)
  const joinRoom = async () => {
    if (!joinCode) {
      setErrorMessage("참여 코드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3003/api/room/${joinCode}`
      );
      const data = await response.json();

      if (response.ok && data.valid) {
        navigate(`/${joinCode}`); // 방으로 이동
      } else {
        setErrorMessage("유효하지 않은 코드입니다.");
      }
    } catch (error) {
      console.error("방 참여 오류:", error);
      setErrorMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="start-page">
      <h1 className="title">Real Time Board</h1>
      <div className="card-container">
        <Card
          title="WorkSpace 생성"
          description="워크스페이스를 만들어 참여 코드를 공유하고, 실시간 협업 화이트보드를 시작해 보세요!"
          buttonText="workspace 생성"
          imageSrc={create_space}
          onClick={createRoom}
          contents="생성하기"
        />
        <Card
          title="WorkSpace 참여"
          description="공유받은 참여 코드를 입력하고, 다른 사용자들과 실시간으로 화이트보드를 이용해 보세요!"
          buttonText="workspace 참여"
          imageSrc={join_space}
          onClick={joinRoom}
          contents="참여하기"
        />
      </div>
    </div>
  );
}
