import React from 'react'
import noteContext from "../Context/notes/noteContext"
import { useContext } from "react"
import { useState } from 'react'

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote}=context

    const [note,setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"", tag:""})
    }
    const onchange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
      <h1>Add Your Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name= "title" value={note.title} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required/>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
