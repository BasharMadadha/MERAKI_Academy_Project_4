import "./PostU.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import Comment from "../../Home/Comment/Comment";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";

import React, { useState } from "react";

const PostU = ({ userProf }) => {
  const options = ["Delete", "Update"];
  //console.log(userProf);
  const [articles, setArticles] = useState([]);
  const [articlesId, setArticlesId] = useState("");
  const [error, setError] = useState(null);

  const [commentUP, setCommentUP] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const getArticlesByAuthor = async () => {
    //console.log(userProf._id);
    await axios
      .get(`http://localhost:5000/articles/search_1?author=${userProf._id}`)
      .then((res) => {
        setArticles(res.data.articles);
        //console.log(res.data.articles);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const DeleteArticle = async (id) => {
    await axios
      .delete(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        //getArticlesByAuthor();
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
        //getArticlesByAuthor();
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;
  //if (!articles) return  navigate("/AddArticle");

  //TEMPORARY
  //const liked = false;

  return (
    <div>
      <div className="post">
        <div className="containerP">
          {articles.map((article) => {
            return (
              <div key={article._id} className="postA">
                <div className="userP">
                  <div className="userInfoP">
                    <img src={userProf.profilePicture} alt="" />
                    <div className="details">
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span className="name">{userProf.firstName}</span>
                      </Link>
                      <span className="date">1 min ago</span>
                    </div>
                  </div>
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
                  <FavoriteOutlinedIcon />
                  12 Likes
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
                {commentUP && article._id === articlesId ? (
                  <Comment
                    article={article}
                    getArticlesByAuthor={getArticlesByAuthor(userProf._id)}
                    setError={setError}
                  />
                ) : null}
                {userProf._id === article.author && (
                  <div className="menuP">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
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
                                  inputLabel: ` What's on your mind ${userProf.firstName} ...`,
                                  inputPlaceholder: "Type in your mind here...",
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

export default PostU;
