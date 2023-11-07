import "./NavBar.css";
import * as React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { userData } from "../../../App";
import Badge from "@mui/material/Badge";

const NavBar = ({ getUserById, getUserById1 }) => {
  const {
    user,
    setToken,
    getArticlesByAuthor,
    setHomeProf,
    setUserId,
    homeProf,
    darkM,
    setDarkM,
    token,
  } = useContext(userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userNav, setUserNav] = useState();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getUserById2(user._id)
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, [user._id]);

  const getUserById2 = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_DB_URI}/users/${id}`)
      .then((res) => {
        setUserNav(res.data.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteNoti = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_DB_URI}/users/notifications/${id}`, config)
      .then((res) => {
        console.log(res);
        getUserById2(user._id);
      })
      .catch((error) => {
        console.log(error.message);
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

  return (
    <div className={darkM ? "navbar-dark" : "navbar"}>
      <div className="left">
        <Link to="#" style={{ textDecoration: "none" }}>
          <span className={darkM ? "logo-dark" : "logo"}>Bashar M.</span>
        </Link>
        <Link
          to="/Home"
          onClick={() => {
            setHomeProf(false);
            localStorage.setItem("homeProf1", JSON.stringify(false));
          }}
        >
          <HomeOutlinedIcon style={{ color: darkM ? "white" : "black" }} />
        </Link>
        {darkM ? (
          <DarkModeOutlinedIcon
            onClick={() => {
              setDarkM(false);
              localStorage.setItem("darkMode", JSON.stringify(false));
            }}
          />
        ) : (
          <WbSunnyOutlinedIcon
            onClick={() => {
              setDarkM(true);
              localStorage.setItem("darkMode", JSON.stringify(true));
            }}
          />
        )}

        <div className="search">
          <SearchOutlinedIcon style={{ color: "black" }} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div onClick={() => {}}>
          <Badge badgeContent={userNav.notifications.length} color="error">
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Notifications">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 1 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <svg viewBox="0 0 448 512" className="bell">
                        <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                      </svg>
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {userNav.notifications.map((noti) => {
                  return (
                    <div key={noti._id}>
                      <List
                        onClick={() => {
                          deleteNoti(noti._id);
                        }}
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                          bgcolor: "background.paper",
                          cursor:"pointer"
                        }}
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt={noti.userName} src={noti.userPic} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={noti.userName}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {noti.stat}
                                </Typography>
                                {noti.mess}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </List>
                      <Divider />
                    </div>
                  );
                })}
              </Menu>
            </React.Fragment>
          </Badge>
        </div>
        <div
          className="user"
          onClick={() => {
            setHomeProf(true);
            localStorage.setItem("homeProf1", JSON.stringify(true));
            setUserId(user._id);
            localStorage.setItem("userId", user._id);
            homeProf ? getUserById() : getUserById1();
            getArticlesByAuthor();
            navigate("/Profile");
          }}
        >
          <img src={userNav.profilePicture} alt="" />
          <span>
            {userNav.firstName} {userNav.lastName}
          </span>
        </div>
        <button
          className="Btn"
          onClick={() => {
            setToken(null);
            localStorage.clear();
            navigate("/");
          }}
        >
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
