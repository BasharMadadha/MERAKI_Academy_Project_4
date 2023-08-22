import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Register from "./components/Home/Register/Register";
import Login from "./components/Home/Login/Login";
import Home from "./components/Home/Home";

export const UserToken = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <UserToken.Provider value={token}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Register />} />
          <Route path="/" element={<Login setToken={setToken} />} />
        </Routes>
      </UserToken.Provider>
    </div>
  );
}

export default App;
