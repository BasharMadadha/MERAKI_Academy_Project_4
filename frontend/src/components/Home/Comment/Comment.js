import { Link } from "react-router-dom";
import axios from "axios";
import { userData } from "../../../App";
import { useState, useContext } from "react";
import "./Comment.css";

const Comment = ({ article, getArticles, setError }) => {
  const { token, user } = useContext(userData);
  const [comment, setComment] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const createComment = async (id) => {
    await axios
      .post(
        `http://localhost:5000/articles/${id}/comments/`,
        { comment },
        config
      )
      .then((res) => {
        getArticles();
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div>
      {article.comments.map((comment) => {
        return (
          <div key={comment._id} className="comment">
            <div className="userInfoP">
              <img src={user.profilePicture} alt="" />
              <div className="detailsC">
                <Link style={{ textDecoration: "none", color: "inherit" }}>
                  <span className="nameC">{article.userName}</span>
                </Link>
                <span className="dateC">1 min ago</span>
              </div>
              <span>{comment.comment}</span>
            </div>
          </div>
        );
      })}
      <textarea
        placeholder="Comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="btnAdd"
        onClick={() => {
          if (comment.length === 0) {
            return alert("please ADD");
          }
          createComment(article._id);
          setComment("");
        }}
      >
        Add Comment
      </button>
    </div>
  );
};

export default Comment;
