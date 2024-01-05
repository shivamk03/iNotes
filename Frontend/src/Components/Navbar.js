import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import NoteAppIcon from "./NoteAppIcon.png";
export default function Navbar() {
  const navigate = useNavigate();
  const HandlelogOutbtn = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token");
  };
  return (
    <div className="navbarContainer">
      <div className="icon-class">
        <div className="icon">
          <img src={NoteAppIcon} alt="" />
        </div>
        <div className="icon-name">
          <Link to="/">
            i<span>Notes</span>
          </Link>
        </div>
      </div>
      <div className="navbarItems">
        <ul className="ulListItems">
          <li className="listItems">
            <Link className="listItemsLink" to="/about">
              About
            </Link>
          </li>
          <li className="listItems">
            <Link className="listItemsLink" to="/">
              Dashboard
            </Link>
          </li>
          <li className="listItems">
            <Link className="listItemsLink" to="/">
              Documents
            </Link>
          </li>
          <li className="listItems">
            <Link className="listItemsLink" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="login-signout">
        {!localStorage.getItem("token") ? (
          <div className="login">
            <div className="logincontainer">
              <Link to="/login" className="loginbtn-login">
                Login
              </Link>
            </div>
            <div className="logincontainer-signup">
              <Link to="/signup" className="loginbtn-signup">
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div className="logincontainer-signup">
            <Link
              to="/signup"
              className="loginbtn-signup"
              onClick={HandlelogOutbtn}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
