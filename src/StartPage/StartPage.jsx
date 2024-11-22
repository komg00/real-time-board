import React from "react";
import "./StartPage.scss";
import Card from "../Card/Card";
import create_space from "../resources/images/create-space.png";
import join_space from "../resources/images/join-space.png";

export default function StartPage() {
  return (
    <div className="start-page">
      <h1 className="title">Real Time Board</h1>
      <div className="card-container">
        <Card
          title="WorkSpace 생성하기"
          description="워크스페이스를 만들어 참여 코드를 공유하고, 실시간 협업 화이트보드를 시작해 보세요!"
          buttonText="workspace 생성"
          imageSrc={create_space}
        />
        <Card
          title="WorkSpace 참여하기"
          description="공유받은 참여 코드를 입력하고, 다른 사용자들과 실시간으로 화이트보드를 이용해 보세요!"
          buttonText="workspace 참여"
          imageSrc={join_space}
        />
      </div>
    </div>
  );
}
