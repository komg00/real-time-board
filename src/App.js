import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Whiteboard from "./Whiteboard/Whiteboard";
import { connectWithSocketServer } from "./socketConn/socketConn";
import CursorOverlay from "./CursorOverlay/CursorOverlay";
import StartPage from "./StartPage/StartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/:space" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
}

export default App;
