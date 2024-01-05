import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notes.css";
import NoteContext from "../Context/noteContext";
import trash from "./trash.png";
export default function Notes() {
  const data = useContext(NoteContext);
  const { deleteNote, getNotes, state } = data;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      const timeout = setTimeout(() => navigate("/login"),0);
      return () => clearTimeout(timeout);
    }
    getNotes();
  });
  return (
    <>
      <div className="container-notes">
        <div className="aside">
          <div className="asideItems">
            <Link to="/addnote">
              Create new Note <i class="fa-solid fa-folder-plus"></i>
            </Link>
          </div>
          <div className="asideItems">
            <Link to="/">Back To Home</Link>
          </div>
        </div>

        <div className="displayNotes">
          {state.map((note) => {
            return (
              <div className="card">
                <div className="cardTitle">{note.title}</div>
                <div className="cardDescription">{note.description}</div>
                <div className="CardDelete">
                  <Link
                    to="/"
                    className="delete"
                    onClick={() => {
                      deleteNote(note._id);
                    }}
                  >
                    <img src={trash} alt="delete" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
