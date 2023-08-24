import "./AddPost.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { userData } from "../../../App";
import Gallery from "../../../image/icons/8.png";
import Swal from "sweetalert2";
//import { Link } from "react-router-dom";

const AddPost = () => {
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState("");
  const { token, user } = useContext(userData);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return (
    <div className="add-post">
      <div className="containerA">
        <div className="userA">
          <div className="userInfoA">
            <img src={user.profilePicture} alt="" />
          </div>
          <input
            className="tt"
            placeholder={`What's on your mind ${user.firstName} ...`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="itemPh">
            {/* <input
              type="file"
              name="file"
              onChange={(e) => {
                setPic(e.target.files[0]);
              }}
            /> */}
            <img src={Gallery} alt="" onClick={() => {}} />
            <span>Add image</span>
          </div>
          <button
            className="learn-more"
            onClick={() => {
              // if (description.length === 0) {
              //   return alert("please ADD");
              // }
              axios
                .post(
                  "http://localhost:5000/articles/",
                  {
                    description,
                    pic,
                  },
                  config
                )
                .then((result) => {
                  setDescription("");
                  <>
                    {Swal.fire({
                      position: "top",
                      icon: "success",
                      title: result.data.message,
                      showConfirmButton: false,
                      timer: 1500,
                    })}
                  </>;
                })
                .catch((error) => {
                  <>
                    {Swal.fire({
                      position: "top",
                      icon: "warning",
                      title: "Please Add",
                      showConfirmButton: false,
                      timer: 1500,
                    })}
                  </>;
                });
            }}
          >
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
