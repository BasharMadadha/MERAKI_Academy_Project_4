import "./AddPost.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { userData } from "../../../App";
import Gallery from "../../../image/icons/8.png";
import Swal from "sweetalert2";


const AddPost = () => {
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState("");
  const { token, user } = useContext(userData);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const processFile = async (files) => {
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
        setPic(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      
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
            <img
              src={Gallery}
              alt=""
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
                    processFile(file);
                  }
                })();
              }}
            ></img>
            <span>Add image</span>
          </div>
          <button
            className="learn-more"
            onClick={() => {
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
                  setTimeout(() => {
                    window.location.reload();
                  }, 1800);
                  //;
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
          {pic.length > 0 && <img src={pic} alt="" className="picU" />}
        </div>
      </div>
      <div>
      {loading && <div className="loader">Loading...</div>}
    </div>
    </div>
  );
};

export default AddPost;
