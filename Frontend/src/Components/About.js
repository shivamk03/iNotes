import React, { useContext } from "react";
// import NoteContext from "../Context/noteContext";
import "./About.css";
import "./About.css";
import instagram from "./instagram.png";
import facebook from "./facebook.png";
import twitter from "./twitter.png";
export default function About() {
  return (
    <>
      <div className="container-about">
        <div className="heading-about">
          <h1>About Us</h1>
        </div>
        <div className="description-about">
          <p>
            iNotes focusses on providing users the best experience and is
            designed for users with which they can write or create their notes,
            and they can save their written notes after clicking the save button
            and the notes will be visible within the note boxes in our UI.
          </p>
        </div>
        <div className="socialmedia">
          <button>
            <img src={facebook} alt="" />
          </button>
          <button>
            <img src={instagram} alt="" />
          </button>
          <button>
            <img src={twitter} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
