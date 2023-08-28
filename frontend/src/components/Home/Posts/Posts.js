import "./Posts.css";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { userData } from "../../../App";
import Comment from "../Comment/Comment";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import React, { useState, useContext, useEffect } from "react";
import Likes from "../Likes/Likes";
// import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
// import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const Posts = () => {
  const options = ["Delete", "Update"];
  const [articlesId, setArticlesId] = useState("");
  const [error, setError] = useState(null);
  const [commentUP, setCommentUP] = useState(false);

  const {
    user,
    getArticlesByAuthor,
    homeProf,
    articles,
    userId,
    setUserId,
    getUserById,
    setHomeProf,
    userProf,
    getArticles,
  } = useContext(userData);
  //console.log(user);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    homeProf ? getArticlesByAuthor() : getArticles();
  }, []);

  const DeleteArticle = async (id) => {
    await axios
      .delete(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        homeProf ? getArticlesByAuthor() : getArticles();
      })
      .catch((error) => {
        setError(error);
      });
  };

  const UpdateArticle = async (id, description) => {
    await axios
      .put(`http://localhost:5000/articles/${id}`, {
        description,
      })
      .then((res) => {
        homeProf ? getArticlesByAuthor() : getArticles();
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <div className="post">
        <div className="containerP">
          {articles.map((article) => {
            return (
              <div key={article._id} className="postA">
                <div className="userP">
                  <Link
                    to="/Profile"
                    onClick={() => {
                      setHomeProf(true);
                      setUserId(article.author);
                      localStorage.setItem("userId", article.author);
                      localStorage.setItem("homeProf1", JSON.stringify(true));
                      getUserById();
                      getArticlesByAuthor();
                    }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="userInfoP">
                      <img src={article.authorPic} alt="" />
                      <div className="details">
                        <span className="name">{article.userName}</span>
                        <span className="date">1 min ago</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="content">
                  <p>{article.description}</p>
                  <img
                    src={article.pic}
                    alt=""
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="itemP">
                  <Likes article={article} />
                  <TextsmsOutlinedIcon
                    onClick={() => {
                      setCommentUP((show) => !show);
                      setArticlesId(article._id);
                    }}
                  />
                  {article.comments.length} Comments
                  <ShareOutlinedIcon />
                  Share
                </div>
                {commentUP && article._id === articlesId && (
                  <Comment
                    article={article}
                    getArticles={getArticles}
                    setError={setError}
                  />
                )}

                {(homeProf ? user._id === userProf._id : true) &&
                  userId === article.author && (
                    <div className="menuP">
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => {
                          handleClick(event);
                          setArticlesId(article._id);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      {article._id === articlesId && (
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClick={handleClose}
                        >
                          {options.map((option) => (
                            <MenuItem
                              key={option}
                              selected={option === "Pyxis"}
                              onClick={() => {
                                if (option === "Delete") {
                                  <>
                                    {Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#d33",
                                      cancelButtonColor: "#3085d6",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        DeleteArticle(article._id);
                                        Swal.fire(
                                          "Deleted!",
                                          "Your file has been deleted.",
                                          "success"
                                        );
                                      }
                                    })}
                                  </>;
                                } else if (option === "Update") {
                                  (() => {
                                    Swal.fire({
                                      input: "textarea",
                                      inputLabel: ` What's on your mind ${user.firstName} ...`,
                                      inputPlaceholder:
                                        "Type in your mind here...",
                                      inputAttributes: {
                                        "aria-label": "Type your message here",
                                      },
                                      showCancelButton: true,
                                    }).then((result) => {
                                      UpdateArticle(article._id, result.value);
                                    });
                                  })();
                                }
                              }}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      )}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;
