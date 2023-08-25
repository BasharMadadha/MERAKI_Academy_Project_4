import LeftBar from "./LeftBar/LeftBar";
import NavBar from "./NavBar/NavBar";
import RightBar from "./RightBar/RightBar";
import Posts from "./Posts/Posts";
import AddPost from "./AddPost/AddPost";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <AddPost />
          <Posts />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
