import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Register.css";
import { Input } from "antd";
import ReactCardFlip from "react-card-flip";

function Register(props) {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [errorMesg, setErrorMesg] = useState("");
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const submitRegister = (e) => {
    e.preventDefault();
    if (pwd != pwd1) {
      setErrorMesg("Passwords don't match");
      handleClick(e);
      return;
    }
    if (uname.trim() != "" && pwd.trim() != "") {
      localStorage.setItem("register", JSON.stringify({ uname, pwd }));
      sessionStorage.setItem("Username", uname);
      history.push("/dashboard");
    } else {
      setErrorMesg("Enter a value");
      handleClick(e);
    }
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="container">
        <div className="title">
          <h1 className="title1">Registration Form</h1>
        </div>

        <div className="input-field-1">
          <Input
            type="text"
            name="uname"
            id="usname"
            className="register-input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter a Username"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
        </div>

        <div className="input-field-2">
          <Input
            type="password"
            name="pwd"
            id="pswd"
            className="register-input"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            placeholder="Enter a Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="input-field-3">
          <Input
            type="password"
            name="pwd1"
            id="pswd1"
            className="register-input"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            value={pwd1}
            onChange={(e) => setPwd1(e.target.value)}
          />
        </div>
        <button className="btn" onClick={submitRegister}>
          Register
        </button>
        <div className="link-item">
          Already Registered?
          <Link to="/">
            <p className="a">Login</p>
          </Link>
        </div>
        <div className="link-item-1">
          Forgot Password?
          <Link to="/forgotpassword">
            <p className="a">Pasword Reset</p>
          </Link>
        </div>
      </div>

      <div className="err-container">
        <div className="err-title">
          <h1 className="err-title1">Error Message</h1>
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

export default Register;
