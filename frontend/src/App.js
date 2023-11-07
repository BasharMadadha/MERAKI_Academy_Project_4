import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import axios from "axios";
export const userData = createContext();

function App() {
  const userD = localStorage.getItem("uDATA");
  const homeProf1 = localStorage.getItem("homeProf1");
  const darkMode = localStorage.getItem("darkMode");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [articles, setArticles] = useState([]);
  const [homeProf, setHomeProf] = useState(JSON.parse(homeProf1));
  const [user, setUser] = useState(JSON.parse(userD));
  const [darkM, setDarkM] = useState(JSON.parse(darkMode));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getArticlesByAuthor = async () => {
    await axios
      .get(`${process.env.REACT_APP_DB_URI}/articles/search_1?author=${userId}`)
      .then((res) => {
        const rever = res.data.articles;
        setArticles([...rever].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getArticles = async () => {
    await axios
      .get(`${process.env.REACT_APP_DB_URI}/articles/`, config)
      .then((res) => {
        const rever = res.data.articles;
        setArticles([...rever].reverse());
        setUserId(res.data.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={darkM ? "dark" : "light"}>
      <userData.Provider
        value={{
          token,
          setToken,
          user,
          setUser,
          getArticlesByAuthor,
          articles,
          setArticles,
          homeProf,
          setHomeProf,
          userId,
          setUserId,
          getArticles,
          darkM,
          setDarkM,
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
