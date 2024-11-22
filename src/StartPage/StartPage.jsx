import React, { useState } from "react";
import "./StartPage.scss";
import Card from "../Card/Card";
import create_space from "../resources/images/create-space.png";
import join_space from "../resources/images/join-space.png";
import { createWorkspace } from "../api/api";

export default function StartPage() {
  const [joinCode, setJoinCode] = useState(null);

  const handleCreateWorkspace = async () => {
    const result = await createWorkspace();

    if (result) {
      setJoinCode(result.apiKey);
    } else {
      alert("워크스페이스 생성에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="start-page">
      <h1 className="title">Real Time Board</h1>
      <div className="card-container">
        <Card
          title="WorkSpace 생성하기"
          description="워크스페이스를 만들어 참여 코드를 공유하고, 실시간 협업 화이트보드를 시작해 보세요!"
          buttonText="workspace 생성"
          imageSrc={create_space}
          onClick={handleCreateWorkspace}
        />
        <Card
          title="WorkSpace 참여하기"
          description="공유받은 참여 코드를 입력하고, 다른 사용자들과 실시간으로 화이트보드를 이용해 보세요!"
          buttonText="workspace 참여"
          imageSrc={join_space}
        />
      </div>
      {joinCode && <p>생성된 참여 코드: {joinCode}</p>}
    </div>
  );
}
