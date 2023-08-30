import "./LeftBar.css";
import Friends from "../../../image/icons/1.png";
import Groups from "../../../image/icons/2.png";
import Market from "../../../image/icons/3.png";
import Watch from "../../../image/icons/4.png";
import Memories from "../../../image/icons/5.png";
import Events from "../../../image/icons/6.png";
import Gaming from "../../../image/icons/7.png";
import Gallery from "../../../image/icons/8.png";
import Videos from "../../../image/icons/9.png";
import Messages from "../../../image/icons/10.png";
import Tutorials from "../../../image/icons/11.png";
import Courses from "../../../image/icons/12.png";
import Fund from "../../../image/icons/13.png";
import { useContext } from "react";
import { userData } from "../../../App";

const LeftBar = () => {
  const { user , darkM} = useContext(userData);

  return (
    <div className={darkM ? "leftBar-dark" : "leftBar"}>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={user.profilePicture} alt="" />
            <span>{user.firstName}{" "}{user.lastName}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
