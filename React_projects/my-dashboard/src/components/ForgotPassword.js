import React, { useState } from "react";
import { Link } from "react-router-dom";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Register.css";
import { Input } from "antd";
import ReactCardFlip from "react-card-flip";

function ForgotPassword() {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [errorMesg, setErrorMesg] = useState("");

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const submitForgot = (e) => {
    e.preventDefault();
    if (uname.trim() == "" || pwd.trim() == "" || pwd1.trim() == "") {
      setErrorMesg("Field cannot be blank");
      handleClick();
    } else {
      if (pwd.trim() != pwd1.trim()) {
        setErrorMesg("Passwords Don't Match");
        handleClick();
      } else {
        const userDets = JSON.parse(localStorage.getItem("register"));
        if (!userDets) {
          setErrorMesg("Register a user first");
          handleClick();
        } else {
          if (uname.trim() != userDets.uname) {
            setErrorMesg("User Does Not Exist");
            handleClick();
          } else {
            localStorage.setItem("register", JSON.stringify({ uname, pwd }));
            sessionStorage.removeItem("Username");
            setErrorMesg("Password Sucessfully Changed");
            handleClick();
          }
        }
      }
    }
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="container">
        <div className="title">
          <h1 className="title1">Password Reset Form</h1>
        </div>

        <div className="input-field-1">
          <Input
            type="text"
            name="uname"
            id="usname"
            className="password-input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter Username"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
        </div>

        <div className="input-field-2">
          <Input
            type="password"
            name="pwd"
            id="pswd"
            className="password-input"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            placeholder="Enter new Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="input-field-3">
          <Input
            type="password"
            name="pwd1"
            id="pswd1"
            className="password-input"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            value={pwd1}
            onChange={(e) => setPwd1(e.target.value)}
          />
        </div>
        <button className="btn" onClick={submitForgot}>
          Reset Password
        </button>
        <div className="link-item">
          Login Here
          <Link to="/">
            <div className="a">Login</div>
          </Link>
        </div>
        <div className="link-item-1">
          Register Here
          <Link to="/register">
            <div className="a">Register</div>
          </Link>
        </div>
      </div>

      <div className="err-container">
        <div className="err-title">
          <h1 className="err-title1">Message</h1>
        </div>
        <div className="err-body">
          <h3>{errorMesg}</h3>
        </div>
        <button className="err-btn" onClick={handleClick}>
          Ok
        </button>
      </div>
    </ReactCardFlip>
  );
}

export default ForgotPassword;
