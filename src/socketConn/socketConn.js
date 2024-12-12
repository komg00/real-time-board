import { io } from "socket.io-client";
import { store } from "../store/store";
import {
  updateCursorPosition,
  removeCursorPosition,
} from "../CursorOverlay/cursorSlice";
import { setElements, updateElement } from "../Whiteboard/whiteboardSlice";
import { createWorkspace } from "../api/api";

let socket;

export const connectWithSocketServer = () => {
  socket = io("http://3.34.149.10:3003");

  socket.on("connect", () => {
    console.log("connected to socket.io server");
  });

  socket.on("whiteboard-state", (elements) => {
    store.dispatch(setElements(elements));
  });

  socket.on("element-update", (elementData) => {
    store.dispatch(updateElement(elementData));
  });

  socket.on("whiteboard-clear", () => {
    store.dispatch(setElements([]));
  });

  socket.on("cursor-position", (cursorData) => {
    store.dispatch(updateCursorPosition(cursorData));
  });

  socket.on("user-disconnected", (disconnectedUserId) => {
    store.dispatch(removeCursorPosition(disconnectedUserId));
  });
};
/*
// 스페이스 생성 함수
export const createSpace = async () => {
  try {
    const result = await createWorkspace();

    if (result) {
      store.dispatch(setApiKey(result.apiKey));
    }

    connectWithSocketServer(result.apiKey);

    console.log("Created and joined new space with apiKey:", result.apiKey);
  } catch (error) {
    console.error("Error creating space:", error);
  }
};

// 기존 스페이스에 참가 함수
export const joinSpace = (spaceId) => {
  store.dispatch(setApiKey(spaceId)); // 현재 스페이스 설정
  connectWithSocketServer(spaceId);
  console.log("Joined existing space with apiKey:", spaceId);
};
*/
export const emitElementUpdate = (roomId, elementData) => {
  if (!socket) return;
  socket.emit("element-update", { roomId, elementData });
};

export const emitClearWhiteboard = (roomId) => {
  if (!socket) return;
  socket.emit("whiteboard-clear", roomId);
};

export const emitCursorPosition = (roomId, cursorData) => {
  if (!socket) return;
  socket.emit("cursor-position", { roomId, cursorData });
};

export const joinRoom = (roomId) => {
  if (!socket) return;

  socket.emit("join-room", roomId);
};
