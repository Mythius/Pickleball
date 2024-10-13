import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Tournament from './pages/Tournament';
import Logout from './pages/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tournament" element={<Tournament />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
