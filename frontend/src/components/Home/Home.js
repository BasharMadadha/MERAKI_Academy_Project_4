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
      .get(`http://localhost:5000/users/${userId}`)
      .then((res) => {
        //console.log(res.data);
        setUserProf(res.data.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const follow = async (id) => {
    await axios
      .post(`http://localhost:5000/users/follow/${id}`, true, config)
      .then((res) => {
        console.log(res);
        homeProf ? getUserById() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unFollow = async (id) => {
    await axios
      .delete(`http://localhost:5000/users/follow/${id}`, config)
      .then((res) => {
        console.log(res);
        homeProf ? getUserById() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <NavBar getUserById1={getUserById} />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <AddPost />
          <Posts userProf={userProf}/>
        </div>
        <RightBar unFollow1={unFollow} follow1={follow} />
      </div>
    </div>
  );
};

export default Home;
