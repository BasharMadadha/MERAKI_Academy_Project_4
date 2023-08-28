import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import { Login } from "@mui/icons-material";
export const userData = createContext();

function App() {
  const userD = localStorage.getItem("uDATA");
  const homeProf1 = localStorage.getItem("homeProf1");
  const [userProf, setUserProf] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  //console.log(token);
  const [articles, setArticles] = useState([]);
  const [homeProf, setHomeProf] = useState(JSON.parse(homeProf1));
  const [user, setUser] = useState(JSON.parse(userD));
  //console.log(user);
  
  const getUserById = async () => {
    await axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((res) => {
        setUserProf(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getArticlesByAuthor = async () => {
    await axios
      .get(`http://localhost:5000/articles/search_1?author=${userId}`)
      .then((res) => {
        const rever = res.data.articles;
        setArticles([...rever].reverse());
        setUserId(res.data.userId)
        localStorage.setItem("userId", res.data.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <userData.Provider
        value={{
          token,
          setToken,
          user,
          setUser,
          userProf,
          getUserById,
          getArticlesByAuthor,
          articles,
          setArticles,
          homeProf,
          setHomeProf,
          userId,
          setUserId,
        }}
      >
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
