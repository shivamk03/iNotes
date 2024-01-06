import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  let history = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://inotes-6ysm.onrender.com/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.jwtToken);
      history("/");
    } else {
      alert("Enter the correct credentials");
    }
    console.log(json);
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };
  return (
    <div className="container">
      <div className="heading">
        <h1>
          Welcome to i<span>Notes.</span>
        </h1>
      </div>
      <form className="loginForm" method="post" onSubmit={handleSubmit}>
        <div className="formContents">
          <label htmlFor="email" className="label">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="value"
            />
          </label>
        </div>
        <div className="formContents">
          <label htmlFor="password" className="label">
            Password:
            <input
              type="text"
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="value"
            />
          </label>
        </div>

        <div className="loginbtn">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
