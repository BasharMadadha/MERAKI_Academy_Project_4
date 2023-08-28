import React from "react";
import { userData } from "../../../App";
import { useContext } from "react";
import axios from "axios";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const Likes = ({ article }) => {
  const { token, getArticlesByAuthor, homeProf, getArticles, userId } =
    useContext(userData);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  //console.log(article);
  const addLike = async (id) => {
    await axios
      .post(`http://localhost:5000/articles/like/${id}`, true, config)
      .then((res) => {
        homeProf ? getArticlesByAuthor() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteLike = async (id) => {
    await axios
      .delete(`http://localhost:5000/articles/like/${id}`,config)
      .then((res) => {
        homeProf ? getArticlesByAuthor() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userLike = article.likes.find((like) => like.user === userId);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {article.likes.length === 0 ? (
        <ThumbUpAltOutlinedIcon
          onClick={() => {
            addLike(article._id);
          }}
        />
      ) : userLike ? (
        <ThumbUpAltRoundedIcon style={{color:"blue"}} onClick={()=>{
            DeleteLike(article._id)
        }}/>
      ) : (
        <ThumbUpAltOutlinedIcon
          onClick={() => {
            addLike(article._id);
          }}
        />
      )}
      <span style={{ marginLeft: "5px" }}>{article.likes.length} Likes</span>
    </div>
  );
};

export default Likes;
