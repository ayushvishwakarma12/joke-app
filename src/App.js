import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
