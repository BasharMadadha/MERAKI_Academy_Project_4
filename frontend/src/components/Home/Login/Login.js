import React from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: "52ch" }} variant="filled">
        <InputLabel>Email</InputLabel>
        <FilledInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type={"email"}
          endAdornment={
            <InputAdornment
              position="start"
              onMouseDown={handleMouseDownPassword}
            >
              <EmailIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, width: "52ch" }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="filled-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br/>
      <p>
        By creating an account you agree to our{" "}
        <Link to="#">Terms & Privacy.</Link>
      </p>
      <br />
      <button className="btnC" onClick={() => {
            axios
              .post("http://localhost:5000/users/login", {
                email,
                password,
              })
              .then((result) => {
                setMessage(result.data.message);
                setToken(result.data.token)
                localStorage.setItem("token", result.data.token);
                //navigate("/Dashboard")
              })
              .catch((error) => {
                setMessage(error.response.data.message);
              });
          }}>Continue</button>
          <br/>
          <h2>{message}</h2>
    </div>
  );
};

export default Login;
