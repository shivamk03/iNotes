import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const local ="https://inotes-6ysm.onrender.com";
  let notes=[];
  const [state,setState]= useState(notes);
    const getNotes=async()=>{
      const url =`https://inotes-6ysm.onrender.com/api/notes/fetchnotes`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
          "auth-token":localStorage.getItem('token')
        }
      });
      let notes= await response.json();
      setState(notes);
      return notes;
    }
    const addNote =async(title,description,tag)=>{
      const url =`https://inotes-6ysm.onrender.com/api/notes/createnote`
      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description})
      });
      const note={
        "_id": "6417fb0a555f1f5d29a9778e",
        "user": `${notes[0].user}`,
        "title": title,
        "description": description,
        "__v": 0
      };
      setState(notes.concat(note));
    }
    const deleteNote=async(id)=>{
      const url =`https://inotes-6ysm.onrender.com/api/notes/deletenote/${id}`
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
          "auth-token":localStorage.getItem('token')
        }
      });
      for(var j =0;j<notes.length;j++){
        if(notes[j].id==id){
          setState(notes.splice(j,1));
        }
      }
    }
    const editNote=async(id,title,description)=>{
      const url =`${local}/api/notes/updatenotes/${id}`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description})
      });
      for (let index = 0; index < notes.length; index++) {
        const element=notes[index];
        if(element._id===id){
          element.title=title;
          element.description=description;
        }
      }
    }
    return(<NoteContext.Provider value={{addNote,deleteNote,editNote,getNotes,state}}>
        {props.children}
    </NoteContext.Provider>);
}
 export default NoteState;
