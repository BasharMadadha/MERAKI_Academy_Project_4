import "./Profile.css";
import ProfileU from "./ProfileU/ProfileU";
import LeftBar from "../Home/LeftBar/LeftBar";
import RightBar from "../Home/RightBar/RightBar";
import NavBar from "../Home/NavBar/NavBar";


const Profile = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <ProfileU />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default Profile;
