import React from "react";
import "./Home.css";
import { useState } from "react";
//import { Link } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";

const Home = () => {
  const [register, setRegister] = useState(true);
  const [toggel, setToggel] = useState(true);

  return (
    <div className="SignupC">
      <div className="textD">
        <h2>sign up</h2>
      </div>
      <div className="SignupM">
        <div className="Signup">
          <div className="toggel">
            <div id="btn" style={{ left: toggel ? 0 : 110 }}></div>
            <button
              className="btnT"
              onClick={() => {
                setRegister(true);
                setToggel(true);
              }}
            >
              Sign Up
            </button>
            <button
              className="btnT"
              onClick={() => {
                setRegister(false);
                setToggel(false);
              }}
            >
              sign In
            </button>
          </div>
          {register ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default Home;
