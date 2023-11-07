import "./ProfileU.css";
import * as React from "react";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { userData } from "../../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Posts from "../../Home/Posts/Posts";

const ProfileU = ({ userProf, getUserById, unFollow, follow }) => {
  const { user, darkM, token } = useContext(userData);
  const [loading, setLoading] = useState(true);
  const [userPost, setUserPost] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    setTimeout(() => {
      getUsers()
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setLoading(false);
        });
      getUserById()
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setLoading(false);
        });
    }, 250);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const processFile = async (files, boolean) => {
    setLoading(true);
    const CLOUD_NAME = "dv7ygzpv8";
    const UNSIGNED_UPLOAD_PRESET = "dpybqbgc";
    const file = files;
    const FETCH_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const DATA = new FormData();

    DATA.append("file", file);
    DATA.append("cloud_name", CLOUD_NAME);
    DATA.append("upload_preset", UNSIGNED_UPLOAD_PRESET);
    await fetch(FETCH_URL, {
      method: "post",
      mode: "cors",
      body: DATA,
    })
      .then((res) => res.json())
      .then((data) => {
        if (boolean) {
          UpdateUserC(userProf?._id, data.url);
        } else {
          UpdateUserP(userProf?._id, data.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const UpdateUserP = async (id, profilePicture) => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        profilePicture,
      })
      .then((res) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "profile Picture Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      })
      .catch((error) => {});
  };

  const UpdateUserC = async (id, profileCover) => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        profileCover,
      })
      .then((res) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "profile Picture Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      })
      .catch((error) => {});
  };

  const getUsers = async () => {
    await axios
      .get(`http://localhost:5000/users/`, config)
      .then((res) => {
        setUserPost(res.data.users);
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

  const userFollower = userProf?.followers.find(
    (follow) => follow.user === user._id
  );

  return (
    <div className="profile">
      <div className="images">
        <img src={userProf?.profileCover} alt="" className="cover" />
        {user._id === userProf?._id && (
          <button
            className="edit-button1"
            onClick={() => {
              (async () => {
                const { value: file } = await Swal.fire({
                  title: "Select image",
                  input: "file",
                  inputAttributes: {
                    accept: "image/*",
                    "aria-label": "Upload your profile cover",
                  },
                });
                if (file) {
                  processFile(file, true);
                }
              })();
            }}
          >
            <svg className="edit-svgIcon1" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>
        )}

        <img src={userProf?.profilePicture} alt="" className="profilePic" />
        {user._id === userProf?._id && (
          <button
            className="edit-button"
            onClick={() => {
              (async () => {
                const { value: file } = await Swal.fire({
                  title: "Select image",
                  input: "file",
                  inputAttributes: {
                    accept: "image/*",
                    "aria-label": "Upload your profile picture",
                  },
                });
                if (file) {
                  processFile(file, false);
                }
              })();
            }}
          >
            <svg className="edit-svgIcon" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="profileContainer">
        <div className={darkM ? "uInfo-dark" : "uInfo"}>
          {user._id === userProf?._id && (
            <button className="edit-button2">
              <svg className="edit-svgIcon2" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button>
          )}
          <div className="center">
            <span>{`${userProf?.firstName} ${userProf?.lastName}`}</span>
            <div className="info">
              <div className="itemF">
                <PlaceIcon />
                <span>{userProf?.country}</span>
              </div>
              <div className="itemF">
                <LanguageIcon />
                <span>{userProf?.email}</span>
              </div>
            </div>
            {userProf?._id !== user._id &&
              (userFollower ? (
                <FavoriteIcon
                  style={{ color: "red", cursor: "pointer" }}
                  fontSize="large"
                  onClick={() => {
                    unFollow(userProf?._id);
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{ cursor: "pointer" }}
                  fontSize="large"
                  onClick={() => {
                    follow(userProf?._id);
                  }}
                />
              ))}
            <div className="spans" style={{ display: "flex" }}>
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Followers">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <span>{userProf?.followers.length} Followers</span>
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
                  {userProf?.followers.length >= 0 &&
                    userProf?.followers.map((follow) => {
                      const userFf = userPost.find(
                        (user1) => follow.user === user1._id
                      );
                      return (
                        <div key={follow._id}>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                              alignItems: "center",
                            }}
                          >
                            <ListItem alignItems="center">
                              <ListItemAvatar>
                                <Avatar
                                  alt={`${userFf.firstName} ${userFf.lastName}`}
                                  src={userFf.profilePicture}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${userFf.firstName} ${userFf.lastName}`}
                              />
                            </ListItem>
                          </List>
                          <Divider />
                        </div>
                      );
                    })}
                </Menu>
              </React.Fragment>
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Following">
                    <IconButton
                      onClick={handleClick1}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open1 ? "account-menu1" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open1 ? "true" : undefined}
                    >
                      <span>{userProf?.following.length} Following</span>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl1}
                  id="account-menu1"
                  open={open1}
                  onClose={handleClose1}
                  onClick={handleClose1}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {userProf?.following.length >= 0 &&
                    userProf?.following.map((follow1) => {
                      const userF = userPost.find(
                        (user1) => follow1.user === user1._id
                      );
                      return (
                        <div key={follow1._id}>
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                              alignItems: "center",
                            }}
                          >
                            <ListItem alignItems="center">
                              <ListItemAvatar>
                                <Avatar
                                  alt={`${userF.firstName} ${userF.lastName}`}
                                  src={userF.profilePicture}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${userF.firstName} ${userF.lastName}`}
                              />
                            </ListItem>
                          </List>
                          <Divider />
                        </div>
                      );
                    })}
                </Menu>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
      <Posts getUserById={getUserById} />
    </div>
  );
};

export default ProfileU;
