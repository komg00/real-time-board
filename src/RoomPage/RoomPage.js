import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connectWithSocketServer, joinRoom } from "../socketConn/socketConn";
import Whiteboard from "../Whiteboard/Whiteboard";
import CursorOverlay from "../CursorOverlay/CursorOverlay";

function RoomPage() {
  const { roomId } = useParams(); // URL에서 roomId 읽기

  useEffect(() => {
    if (roomId) {
      connectWithSocketServer(); // 소켓 서버 연결
      joinRoom(roomId); // 특정 Room에 참여
    }
  }, [roomId]);

  if (!roomId) {
    return <h1>Room ID가 필요합니다.</h1>;
  }

  return (
    <>
      <Whiteboard />
      <CursorOverlay />
    </>
  );
}

export default RoomPage;
