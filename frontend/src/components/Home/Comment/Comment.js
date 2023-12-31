import { Link } from "react-router-dom";
import axios from "axios";
import { userData } from "../../../App";
import { useContext } from "react";
import "./Comment.css";
import Swal from "sweetalert2";

const Comment = ({ article,userPost }) => {
  const { token, user, getArticlesByAuthor, homeProf ,getArticles,darkM} = useContext(userData);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const createComment = async (id, comment) => {
    await axios
      .post(
        `${process.env.REACT_APP_DB_URI}/articles/${id}/comments/`,
        { comment },
        config
      )
      .then((res) => {
        homeProf ? getArticlesByAuthor() : getArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleComment = async () => {
    await Swal.fire({
      input: "textarea",
      inputLabel: ` What's on your mind ${user.firstName} ...`,
      inputPlaceholder: "Type in your mind here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    })
      .then((result) => {
        if (result.value) {
          createComment(article._id, result.value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {article.comments.map((comment) => {
        const userComment = userPost.find(
          (user1) => comment.commenter === user1._id
        );
        return (userComment._id === comment.commenter&&
          <div key={comment._id} className={darkM ? "comment-dark" : "comment"}>
            <div className="userInfoP">
              <img src={userComment.profilePicture} alt="" />
              <div className="detailsC">
                <Link style={{ textDecoration: "none", color: "inherit" }}>
                  <span className="nameC">{`${userComment.firstName} ${userComment.lastName}`}</span>
                </Link>
                <span className="dateC">{comment.commentDate}</span>
              </div>
              <span>{comment.comment}</span>
            </div>
          </div>
        );
      })}
      <button className="Btnx" onClick={handleComment}>
        <div className="signx">+</div>
        <div className="textx">Create</div>
      </button>
    </div>
  );
};

export default Comment;
