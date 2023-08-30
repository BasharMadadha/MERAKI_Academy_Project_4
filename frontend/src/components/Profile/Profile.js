
import ProfileU from "./ProfileU/ProfileU";
import LeftBar from "../Home/LeftBar/LeftBar";
import RightBar from "../Home/RightBar/RightBar";
import NavBar from "../Home/NavBar/NavBar";
import axios from "axios";
import { useContext,useState } from "react";
import { userData } from "../../App";

const Profile = () => {
  const {userId,token,homeProf,getArticles} =
    useContext(userData);
    
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
        //console.log(res);
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
    <div style={{ fontFamily: "Roboto,-apple-system,system-ui,BlinkMacSystemFont,segoe ui,helvetica neue,Arial,sans-serif" }}>
      <NavBar getUserById={getUserById}/>
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <ProfileU getUserById={getUserById} userProf={userProf} follow={follow} unFollow={unFollow}/>
        </div>
        <RightBar follow={follow} unFollow={unFollow}/>
      </div>
    </div>
  );
};

export default Profile;
