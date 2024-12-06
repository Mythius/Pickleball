import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Tournament from "./pages/Tournament";
import Logout from "./pages/Logout";
import History from "./pages/History";
import MyTourneys from "./pages/MyTourneys";
import { useEffect, useReducer } from "react";
import { SocketProvider } from "./SocketContext";

function App() {

  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tournament" element={<Tournament />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/my-tourneys" element={<MyTourneys />}></Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
