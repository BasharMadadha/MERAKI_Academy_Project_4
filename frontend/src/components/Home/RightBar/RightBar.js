import "./RightBar.css";
import { useContext, useEffect, useState } from "react";
import { userData } from "../../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RightBar = ({ unFollow, follow, unFollow1, follow1 }) => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [followId, setfollowId] = useState("");
  const {
    token,
    getArticlesByAuthor,
    getUserById,
    setUserId,
    setHomeProf,
    homeProf,
    user,
  } = useContext(userData);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await axios
      .get(`http://localhost:5000/users/`, config)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Shuffling the users array
  // const shuffledUsers = [...users];
  // for (let i = shuffledUsers.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
  // }

  return (
    <div className="rightBar">
      <div className="containerR">
        <div className="itemR">
          <span>Suggestions For You</span>
          {users.map((user1) => {
            const userFollow = user1.followers.find(
              (follow) => follow.user._id !== user._id
            );
            return (
              user1._id !== user._id &&
              !userFollow && (
                <div key={user1._id} className="userR">
                  <Link
                    to="/Profile"
                    onClick={() => {
                      if (homeProf) {
                        setUserId(user1._id);
                        localStorage.setItem("userId", user1._id);
                        getUserById();
                        getArticlesByAuthor();
                      }
                      setHomeProf(true);
                      setUserId(user1._id);
                      localStorage.setItem("userId", user1._id);
                      localStorage.setItem("homeProf1", JSON.stringify(true));
                    }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="userInfo">
                      <img src={user1.profilePicture} alt="" />
                      <span>{`${user1.firstName} ${user1.lastName}`}</span>
                    </div>
                  </Link>
                  <div className="buttons">
                    {show && user1._id === followId ? (
                      <FavoriteIcon
                        style={{ color: "red" }}
                        onClick={() => {
                          setShow(false);
                          homeProf ? unFollow(user1._id) : unFollow1(user1._id);
                          setfollowId(user1._id);
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={() => {
                          setShow(true);
                          homeProf ? follow(user1._id) : follow1(user1._id);
                          setfollowId(user1._id);
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            );
          })}
        </div>
        {/* <div className="itemR">
          <span>Latest Activities</span>
          {users.map((user) => {
            return (
              <div key={user._id} className="userR">
                <div className="userInfo">
                  <img src={user.profilePicture} alt="" />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                  <p>changed their cover picture</p>
                </div>
                <span>1 min ago</span>
              </div>
            );
          })}
        </div> */}
        <div className="itemR">
          <span>Online Friends</span>
          {users.map((user1) => {
            return (
              user1._id !== user._id && (
                <div key={user1._id} className="userR">
                  <div className="userInfo">
                    <img src={user1.profilePicture} alt="" />
                    <div className="online" />
                    <span>{`${user1.firstName} ${user1.lastName}`}</span>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
