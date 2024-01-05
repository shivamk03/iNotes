import React, { useContext, useState } from "react";
import "./AddNote.css";
import { Link } from "react-router-dom";
import noteContext from "../Context/noteContext";

export default function () {
  const [note, setnote] = useState({ title: "", description: "" });
  const data = useContext(noteContext);

  const { addNote } = data;
  const handleChange = (event) => {
    setnote({ ...note, [event.target.name]: event.target.value });
  };
  const handleClick = (e) => {
    // e.preventDefault();
    addNote(note.title, note.description);
  };
  return (
    <>
      <div className="container-addnote">
        <div className="title">
          <h1>Title:</h1>
          <textarea
            name="title"
            id="title"
            cols="80"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="description-addnote">
          <h1>Description:</h1>
          <textarea
            name="description"
            id="description"
            cols="80"
            rows="20"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="add-button">
          <Link to="/" onClick={handleClick}>
            ADD
          </Link>
        </div>
      </div>
    </>
  );
}
