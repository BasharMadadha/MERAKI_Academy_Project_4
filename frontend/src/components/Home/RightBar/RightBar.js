import "./RightBar.css";
import { useContext, useEffect, useState } from "react";
import { userData } from "../../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const RightBar = ({ unFollow, follow, unFollow1, follow1, getUserById }) => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [followId, setfollowId] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    token,
    getArticlesByAuthor,
    setUserId,
    setHomeProf,
    homeProf,
    user,
    darkM,
  } = useContext(userData);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    getUsers()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, []);

  const getUsers = async () => {
    await axios
      .get(`${process.env.DB_URI}/users/`, config)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  const userR = users.find((user1) => user1._id === user._id);

  // Shuffling the users array
  const shuffledUsers = [...users];
  for (let i = shuffledUsers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
  }

  return (
    <div className={darkM ? "rightBar-dark" : "rightBar"}>
      <div className="containerR">
        <div className={darkM ? "itemR-dark" : "itemR"}>
          <span>Suggestions For You</span>
          {shuffledUsers.map((user1) => {
            const userFollow = userR.following.find(
              (follow) => follow.user === user1._id
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
        <div className={darkM ? "itemR-dark" : "itemR"}>
          <span>Online Friends</span>
          {users.map((user1) => {
            const followersU = user1.followers.find(
              (follow) => follow.user === user._id
            );
            const followingU = user1.following.find(
              (follow) => follow.user === user._id
            );
            return (
              user1._id !== user._id &&
              followersU &&
              followingU && (
                <Link
                  key={user1._id}
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
                  <div className="userR">
                    <div className="userInfo">
                      <img src={user1.profilePicture} alt="" />
                      <div className="online" />
                      <span>{`${user1.firstName} ${user1.lastName}`}</span>
                    </div>
                  </div>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
