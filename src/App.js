import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Tournament from "./pages/Tournament";
import Logout from "./pages/Logout";
import History from "./pages/History";
import MyTourneys from "./pages/MyTourneys";
import { useEffect, useReducer } from "react";

let socket;
if (window.io) {
  socket = window.io.connect("https://backend.msouthwick.com");
}

function App() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    if (!socket) return;
    socket.on("update", (data) => {
      forceUpdate();
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tournament" element={<Tournament />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/my-tourneys" element={<MyTourneys />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
