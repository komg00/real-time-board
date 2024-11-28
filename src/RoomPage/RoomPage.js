import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connectWithSocketServer, joinRoom } from "../socketConn/socketConn";
import Whiteboard from "../Whiteboard/Whiteboard";
import CursorOverlay from "../CursorOverlay/CursorOverlay";

function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isValidRoom, setIsValidRoom] = useState(null);

  // 방 유효성 검증
  const validateRoom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:3003/api/room/${roomId}`);
      const data = await response.json();
      if (response.ok && data.valid) {
        setIsValidRoom(true);
        connectWithSocketServer();
        joinRoom(roomId);
      } else {
        setIsValidRoom(false);
      }
    } catch (error) {
      console.error("Error validating room:", error);
      setIsValidRoom(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      validateRoom(roomId);
    }
  }, [roomId]);

  if (isValidRoom === false) {
    return (
      <div>
        <h1>유효하지 않은 Room ID입니다.</h1>
        <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
      </div>
    );
  }

  if (isValidRoom === null) {
    return <h1>방 ID를 확인 중입니다...</h1>;
  }

  return (
    <>
      <Whiteboard roomId={roomId} />
      <CursorOverlay />
    </>
  );
}

export default RoomPage;
