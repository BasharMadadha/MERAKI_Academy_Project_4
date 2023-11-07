import "./Home.css"
import LeftBar from "./LeftBar/LeftBar";
import NavBar from "./NavBar/NavBar";
import RightBar from "./RightBar/RightBar";
import Posts from "./Posts/Posts";
import AddPost from "./AddPost/AddPost";
import axios from "axios";
import { useContext,useState } from "react";
import { userData } from "../../App";

const Home = () => {
  const { userId,token,homeProf,getArticles } = useContext(userData);
  const [userProf, setUserProf] = useState();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getUserById = async () => {
    await axios
      .get(`${process.env.REACT_APP_DB_URI}/users/${userId}`)
      .then((res) => {
        setUserProf(res.data.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const follow = async (id) => {
    await axios
      .post(`${process.env.REACT_APP_DB_URI}/users/follow/${id}`, true, config)
      .then((res) => {
        homeProf ? getUserById() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unFollow = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_DB_URI}/users/follow/${id}`, config)
      .then((res) => {
        homeProf ? getUserById() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Home" >
      <NavBar getUserById1={getUserById}/>
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div className="mid">
          <AddPost />
          <Posts/>
        </div>
        <RightBar unFollow1={unFollow} follow1={follow} />
      </div>
    </div>
  );
};

export default Home;
