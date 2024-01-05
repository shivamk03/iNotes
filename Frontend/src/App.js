import "./App.css";
import Navbar from "./Components/Navbar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.js";
import NoteState from "./Context/noteState";
import About from "./Components/About";
import AddNote from "./Components/AddNote";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Contact from "./Components/Contact";
function App() {
  return (
    <>
      <BrowserRouter>
        <NoteState>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/contact" element={<Contact />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/addnote" element={<AddNote />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<SignUp />}></Route>
          </Routes>
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
