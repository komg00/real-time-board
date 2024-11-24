import { io } from "socket.io-client";
import { store } from "../store/store";
import {
  setApiKey,
  updateElement,
  setElements,
  clearWhiteboard,
} from "../Whiteboard/whiteboardSlice";
import {
  updateCursorPosition,
  removeCursorPosition,
} from "../CursorOverlay/cursorSlice";
import { createWorkspace } from "../api/api";

let socket;

// 소켓 서버에 연결되면 이 함수 실행
export const connectWithSocketServer = (apiKey) => {
  if (!apiKey) return;

  if (socket) {
    console.warn("Socket is already connected");
    return;
  }

  socket = io("http://localhost:3003");

  socket.on("connect", () => {
    console.log("connected to socket.io server");
    socket.emit("join-space", apiKey);
  });

  socket.on("whiteboard-state", (elements) => {
    store.dispatch(setElements({ apiKey, elements }));
  });

  socket.on("element-update", (elementData) => {
    store.dispatch(updateElement({ apiKey, elementData }));
  });

  socket.on("whiteboard-clear", () => {
    store.dispatch(clearWhiteboard({ apiKey }));
  });

  socket.on("cursor-position", (cursorData) => {
    store.dispatch(updateCursorPosition(cursorData));
  });

  socket.on("user-disconnected", (disconnectedUserId) => {
    //store.dispatch(removeCursorPosition(disconnectedUserId));
  });
};

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
export const joinSpace = (apiKey) => {
  store.dispatch(setApiKey(apiKey)); // 현재 스페이스 설정
  connectWithSocketServer(apiKey);
  console.log("Joined existing space with apiKey:", apiKey);
};

export const emitElementUpdate = (apiKey, elementData) => {
  socket.emit("element-update", { apiKey, ...elementData });
};

export const emitClearWhiteboard = (apiKey) => {
  socket.emit("whiteboard-clear", { apiKey });
};

export const emitCursorPosition = (apiKey, cursorData) => {
  socket.emit("cursor-position", { apiKey, ...cursorData });
};
