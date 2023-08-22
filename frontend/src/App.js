import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import User from "./components/User/User";

export const UserToken = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  

  return (
    <div className="App">
      <UserToken.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/" element={<User setToken={setToken}/>} />
        </Routes>
      </UserToken.Provider>
    </div>
  );
}

export default App;
