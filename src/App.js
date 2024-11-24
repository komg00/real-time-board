import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage/StartPage";
import RoomPage from "./RoomPage/RoomPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
