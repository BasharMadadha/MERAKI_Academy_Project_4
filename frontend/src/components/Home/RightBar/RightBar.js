import "./RightBar.css";
import { useContext, useEffect, useState } from "react";
import { userData } from "../../../App";
import axios from "axios";
import { Link } from "react-router-dom";

const RightBar = () => {
  const [users, setUsers] = useState([]);
  const {
    token,
    getArticlesByAuthor,
    getUserById,
    setUserId,
    setHomeProf,
    homeProf,
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
        //console.log(res.data.users);
        setUsers(res.data.users);
        //setUserId(res.data.users);
      })
      .catch((error) => {
        //setError(error);
      });
  };

  return (
    <div className="rightBar">
      <div className="containerR">
        <div className="itemR">
          <span>Suggestions For You</span>
          {users.map((user) => {
            return (
              <div key={user._id} className="userR">
                <Link
                  to="/Profile"
                  onClick={() => {
                    if (homeProf) {
                      setUserId(user._id);
                      localStorage.setItem("userId", user._id);
                      getUserById();
                      getArticlesByAuthor();
                    }
                    setHomeProf(true);
                    setUserId(user._id);
                    localStorage.setItem("userId", user._id);
                    localStorage.setItem("homeProf1", JSON.stringify(true));
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="userInfo">
                    <img src={user.profilePicture} alt="" />
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                  </div>
                </Link>
                <div className="buttons">
                  <button>follow</button>
                  <button>dismiss</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="itemR">
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
        </div>
        <div className="itemR">
          <span>Online Friends</span>
          {users.map((user) => {
            return (
              <div key={user._id} className="userR">
                <div className="userInfo">
                  <img src={user.profilePicture} alt="" />
                  <div className="online" />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
