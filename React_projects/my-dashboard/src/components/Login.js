import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Input } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Login.css";
import ReactCardFlip from "react-card-flip";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [errorMesg, setErrorMesg] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const userDets = JSON.parse(localStorage.getItem("register"));
    const { uname, pwd } = userDets;
    if (uname === userName && pwd === password) {
      sessionStorage.setItem("Username", uname);
      return history.push("/dashboard");
    }
    setErrorMesg("Invalid Login... Try Again");
    handleClick(e);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="l-container">
        <div className="l-title">
          <h1 className="l-title1">Login Form</h1>
        </div>
        <div className="l-input-field-1">
          <Input
            type="text"
            name="uname"
            id="usname"
            className="login-input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter your Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="l-input-field-2">
          <Input
            type="password"
            name="pwd"
            id="pswd"
            className="login-input"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="l-btn" onClick={submitLogin}>
          Login
        </button>

        <div className="l-link-item">
          Not a Member?
          <Link to="register">
            <div className="a">Register Here</div>
          </Link>
        </div>

        <div className="l-link-item-1">
          Forgot Password?
          <Link to="forgotpassword">
            <div className="a">Password Reset</div>
          </Link>
        </div>
      </div>

      <div className="err-container1">
        <div className="err-title2">
          <h1 className="err-title3">Error Message</h1>
        </div>
        <div className="err-body1">
          <h3>{errorMesg}</h3>
        </div>
        <button className="err-btn1" onClick={handleClick}>
          Ok
        </button>
      </div>
    </ReactCardFlip>
  );
}

export default Login;
