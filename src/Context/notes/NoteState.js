import React, { useState } from "react";
import NoteContext from "./noteContext";
//import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000"
    // const s1 = {
    //     "name": "Harry",
    //     "class": "5b"
    // }
    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "larry",
    //             "class": "12b"
    //         })
    //     }, 1000);
    // }
    const notesInitial=[
      //   {
      //     "_id": "65d2f8467000ab5eeef6cf43",
      //     "user": "65cd0195129160b8f4907074",
      //     "title": "this is a new note",
      //     "description": "test note",
      //     "tag": "Personal",
      //     "date": "2024-02-19T06:42:14.943Z",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "65d2f8567000ab5eeef6cf45",
      //     "user": "65cd0195129160b8f4907074",
      //     "title": "this is a second new note",
      //     "description": "test note",
      //     "tag": "Personal",
      //     "date": "2024-02-19T06:42:30.587Z",
      //     "__v": 0
      //   },
      //   {
      //       "_id": "65d2f8467000ab5eeef6cf43",
      //       "user": "65cd0195129160b8f4907074",
      //       "title": "this is a new note",
      //       "description": "test note",
      //       "tag": "Personal",
      //       "date": "2024-02-19T06:42:14.943Z",
      //       "__v": 0
      //     },
      //     {
      //       "_id": "65d2f8567000ab5eeef6cf45",
      //       "user": "65cd0195129160b8f4907074",
      //       "title": "this is a second new note",
      //       "description": "test note",
      //       "tag": "Personal",
      //       "date": "2024-02-19T06:42:30.587Z",
      //       "__v": 0
      //     },
      //     {
      //       "_id": "65d2f8467000ab5eeef6cf43",
      //       "user": "65cd0195129160b8f4907074",
      //       "title": "this is a new note",
      //       "description": "test note",
      //       "tag": "Personal",
      //       "date": "2024-02-19T06:42:14.943Z",
      //       "__v": 0
      //     },
      //     {
      //       "_id": "65d2f8567000ab5eeef6cf45",
      //       "user": "65cd0195129160b8f4907074",
      //       "title": "this is a second new note",
      //       "description": "test note",
      //       "tag": "Personal",
      //       "date": "2024-02-19T06:42:30.587Z",
      //       "__v": 0
      //     },
      //     {
      //       "_id": "65d2f8467000ab5eeef6cf43",
      //       "user": "65cd0195129160b8f4907074",
      //       "title": "this is a new note",
      //       "description": "test note",
      //       "tag": "Personal",
      //       "date": "2024-02-19T06:42:14.943Z",
      //       "__v": 0
      //     },
      //     {
      //       "_id": "65d2f8567000ab5eeef6cf45",
      //       "user": "65cd0195129160b8f4907074",
      //       "title": "this is a second new note",
      //       "description": "test note",
      //       "tag": "Personal",
      //       "date": "2024-02-19T06:42:30.587Z",
      //       "__v": 0
      //     }
       ]
      const [notes,setNotes] = useState(notesInitial)
        //Get all note
    const getNote = async () =>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
        },
       
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }
    //ADD a note
    const addNote = async (title, description, tag) =>{
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });
      // const json= await response.json()
      //console.log(json)
      // const note={
      //       "_id": "65d2f8567000ab5eeef6cf454",
      //       "user": "65cd0195129160b8f4907074",
      //       "title": "this note has been added using submit",
      //       "description": "test note using submit",
      //       "tag": "Personal",
      //       "date": "2024-02-19T06:42:30.587Z",
      //       "__v": 0
      // }

      const note = await response.json()
      setNotes(notes.concat(note))
      //const json = response.json
    }
    //Delete a note
    const deleteNote = async (id) =>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
        },
      });
      const json = await response.json(); 
      console.log(json)
      console.log("Deleting Note with id"+id)
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }
    //Update a note
    const editNote = async (id,title,description,tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const json = response.json(); 
      console.log(json)
      let newNotes = JSON.parse(JSON.stringify(notes))
      //Logic to Edit
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id===id) {
          newNotes[index].title=title
          newNotes[index].description=description
          newNotes[index].tag=tag
          break;
        }
        
      }
      setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState