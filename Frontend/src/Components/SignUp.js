import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  let history = useNavigate();
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://inotes-6ysm.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.jwtToken);
      history("/");
    } else {
      alert("Email already exists");
    }
    console.log(json);
  };
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };
  return (
    <div>
      <div className="container">
        <div className="heading">
          <h1>
            Welcome to i<span>Notes.</span>
          </h1>
          {/* <p>Enjoy our latest Services. We do what we do best.</p> */}
        </div>
        <form className="loginForm" method="post" onSubmit={handleSubmit}>
          <div className="formContents">
            <label htmlFor="name" className="label">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={handleChange}
                className="value"
              />
            </label>
          </div>
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
            <button type="submit" onClick={handleSubmit}>
              Sign Up!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
