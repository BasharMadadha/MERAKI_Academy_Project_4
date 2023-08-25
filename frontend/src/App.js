import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
export const userData = createContext();

function App() {
  const userD = localStorage.getItem("uDATA");

  const [token, setToken] = useState(localStorage.getItem("token"));
  //console.log(token);
  const [user, setUser] = useState(JSON.parse(userD));
  //console.log(user);
  return (
    <div className="App">
      <userData.Provider value={{ token, setToken, user, setUser }}>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </userData.Provider>
    </div>
  );
}

export default App;
