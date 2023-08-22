import React from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    country: "",
  });
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div>
      <TextField
        error={err ? null : 1}
        sx={{ m: 1, width: "25ch" }}
        id="filled-firstName-flexible"
        label="First Name"
        name="firstName"
        maxRows={4}
        variant="filled"
        value={userData.firstName}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1, width: "25ch" }}
        id="filled-lastName-flexible"
        label="Last Name"
        name="lastName"
        maxRows={4}
        variant="filled"
        value={userData.lastName}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1, width: "25ch" }}
        id="filled-age-flexible"
        label="Age"
        name="age"
        type="number"
        maxRows={4}
        variant="filled"
        value={userData.age}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1, width: "25ch" }}
        id="filled-country-flexible"
        label="Country"
        name="country"
        maxRows={4}
        variant="filled"
        value={userData.country}
        onChange={handleChange}
      />
      <FormControl sx={{ m: 1, width: "52ch" }} variant="filled">
        <InputLabel>Email</InputLabel>
        <FilledInput
          value={userData.email}
          name="email"
          onChange={handleChange}
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
          value={userData.password}
          name="password"
          onChange={handleChange}
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
      <p>
        By creating an account you agree to our{" "}
        <Link to="#">Terms & Privacy.</Link>
      </p>
      <br />
      <button
        className="btnC"
        onClick={() => {
          axios
            .post("http://localhost:5000/users/register", {...userData})
            .then((result) => {
              setMessage(result.data.message);
              //navigate("/users/login");
            })
            .catch((error) => {
              setMessage(error.response.data.message);
              setErr(error.response.data.success);
            });
        }}
      >
        Continue
      </button>
      <br />
      <h2 style={{ color: "#e57373" }}>{message}</h2>
    </div>
  );
};

export default Register;
