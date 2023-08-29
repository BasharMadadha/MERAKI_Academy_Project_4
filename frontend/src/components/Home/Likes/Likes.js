import React from "react";
import "./Like.css";
import { userData } from "../../../App";
import { useContext, useState } from "react";
import axios from "axios";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const Likes = ({ article }) => {
  const { token, getArticlesByAuthor, homeProf, getArticles, userId } =
    useContext(userData);

    const [toggel, setToggel] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const addLike = async (id) => {
    await axios
      .post(`http://localhost:5000/articles/like/${id}`, true, config)
      .then((res) => {
        homeProf ? getArticlesByAuthor() : getArticles();
        console.log(res.data.liked);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteLike = async (id) => {
    await axios
      .delete(`http://localhost:5000/articles/like/${id}`, config)
      .then((res) => {
        homeProf ? getArticlesByAuthor() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userLike = article.likes.find((like) => like.user._id === userId);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {article.likes.length === 0 ? (
        <ThumbUpAltOutlinedIcon
          onClick={() => {
            addLike(article._id);
          }}
        />
      ) : userLike ? (
        <ThumbUpAltRoundedIcon
          style={{ color: "blue" }}
          onClick={() => {
            DeleteLike(article._id);
          }}
        />
      ) : (
        <ThumbUpAltOutlinedIcon
          onClick={() => {
            addLike(article._id);
          }}
        />
      )}
      <span
        onClick={() => {
          setToggel((prv)=>!prv)

        }}
        style={{ marginLeft: "5px" }}
      >
        {article.likes.length} Likes
      </span>
      {toggel && (
        <Box className="box" sx={{ flexGrow: 1, maxWidth: 752 }}>
          <List>
            {article.likes.map((like) => {
              return (
                <ListItem key={like._id}>
                  <ListItemAvatar>
                    <Avatar src={like.userPic} />
                  </ListItemAvatar>
                  <ListItemText primary={like.userName} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </div>
  );
};

export default Likes;
