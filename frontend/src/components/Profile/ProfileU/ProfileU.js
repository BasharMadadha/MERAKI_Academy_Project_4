import "./ProfileU.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { userData } from "../../../App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PostU from "../postU/PostU";

const ProfileU = () => {
  const { user } = useContext(userData);
  const [userProf, setUserProf] = useState({});
  //console.log("dd",userProf);
  //console.log(user);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    await axios
      .get(`http://localhost:5000/users/${user._id}`)
      .then((res) => {
        setUserProf(res.data.user);
        getUserById();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const processFile = async (files, boolean) => {
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
          UpdateUserC(userProf._id, data.url);
        } else {
          UpdateUserP(userProf._id, data.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      })
      .catch((error) => {});
  };
  return (
    <div className="profile">
      <div className="images">
        <img src={userProf.profileCover} alt="" className="cover" />
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
        <img src={userProf.profilePicture} alt="" className="profilePic" />
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
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <button
              className="edit-button2"
            >
              <svg className="edit-svgIcon2" viewBox="0 0 512 512">
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </button> 
          <div className="center">
            <span>{`${userProf.firstName} ${userProf.lastName}`}</span>
            <div className="info">
              <div className="itemF">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="itemF">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <PostU userProf={userProf}/>
    </div>
  );
};

export default ProfileU;
