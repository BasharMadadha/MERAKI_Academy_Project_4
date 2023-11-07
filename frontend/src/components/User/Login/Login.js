import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import EmailIcon from "@mui/icons-material/Email";
//import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { userData } from "../../../App";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUser } = useContext(userData);
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
      <br />
      <p style={{ color: "black" }}>
        By creating an account you agree to our{" "}
        <Link to="#">Terms & Privacy.</Link>
      </p>
      <br />
      <button
        className="btnC"
        onClick={async () => {
          await axios
            .post(`${process.env.DB_URI}/users/login`, {
              email,
              password,
            })
            .then((result) => {
              setMessage(result.data.message);
              setToken(result.data.token);
              setUser(result.data.data)
              localStorage.setItem("uDATA", JSON.stringify(result.data.data));
              localStorage.setItem("token", result.data.token);
              navigate("/Home");
            })
            .catch((error) => {
              setMessage(error.response.data.message);
            });
        }}
      >
        Continue
      </button>
      <br />
      <h2 style={{ color: "#e57373" }}>{message}</h2>
      {/* <GoogleLogin
        clientId="29384127815-7j7snlmoog4ir7nqe84ec7o4tj64j536.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}
    </div>
  );
};

export default Login;

//29384127815-7j7snlmoog4ir7nqe84ec7o4tj64j536.apps.googleusercontent.com
