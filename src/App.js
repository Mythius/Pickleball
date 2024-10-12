import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Tournament from './pages/Tournament';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tournament" element={<Tournament />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
