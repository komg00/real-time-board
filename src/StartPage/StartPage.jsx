import React, { useState } from "react";
import "./StartPage.scss";
import Card from "../Card/Card";
import create_space from "../resources/images/create-space.png";
import join_space from "../resources/images/join-space.png";

export default function StartPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const createRoom = async () => {
    try {
      const response = await fetch("http://3.34.149.10:3003/api/room");
      const data = await response.json();
      return data.roomId; // 생성된 roomId 반환
    } catch (error) {
      console.error("방 생성 오류:", error);
      throw new Error("방을 생성할 수 없습니다.");
    }
  };

  const joinRoom = async (inputCode) => {
    if (!inputCode) {
      setErrorMessage("참여 코드를 입력해주세요.");
      return false;
    }
    try {
      const response = await fetch(
        `http://3.34.149.10:3003/api/room/${inputCode}`
      );
      const data = await response.json();

      if (response.ok && data.valid) {
        window.open(`/${inputCode}`, "_blank");
        return true;
      } else {
        setErrorMessage("유효하지 않은 코드입니다.");
        return false;
      }
    } catch (error) {
      console.error("방 참여 오류:", error);
      setErrorMessage("서버 오류가 발생했습니다.");
      return false;
    }
  };

  return (
    <div className="start-page">
      <h1 className="title">Real Time Board</h1>
      <div className="card-container">
        <Card
          title="WorkSpace 생성"
          description="워크스페이스를 만들어 참여 코드를 공유하고, 실시간 협업 화이트보드를 시작해 보세요!"
          buttonText="워크스페이스 생성"
          imageSrc={create_space}
          onClick={createRoom}
          type="create"
        />
        <Card
          title="WorkSpace 참여"
          description="공유받은 참여 코드를 입력하고, 다른 사용자들과 실시간으로 화이트보드를 이용해 보세요!"
          buttonText="워크스페이스 참여"
          imageSrc={join_space}
          onClick={joinRoom}
          type="join"
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
