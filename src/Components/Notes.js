import noteContext from "../Context/notes/noteContext"
import { useContext, useEffect, useRef, useState } from "react"
import React from 'react'
import Noteitem from "./Noteitem"
import AddNote from "./AddNote"
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNote, editNote } = context
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }
    else{
      navigate('/login')
    }
    
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const updateNote = (curentNote) => {
    ref.current.click()
    setNote({id:curentNote._id,etitle:curentNote.title, edescription: curentNote.description, etag: curentNote.tag} )
  }
  const [note,setNote] = useState({id:"", etitle:"", edescription:"", etag:""})
  const handleClick = (e) =>{
    console.log("Updating the Note",note)
    editNote(note.id, note.etitle,note.edescription,note.etag)
    refClose.current.click()
    //e.preventDefault()
    // addNote(note.title, note.description, note.tag)
}
const onchange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <>
      <AddNote />
      <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 } onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">

        <h1>Your Note</h1>
        <div className="container mx-2" >
        {notes.length===0 && 'No notes to display'}
        </div>
        {
          notes.map((note) => {
            //console.log(notes.title)
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />


          })
        }
      </div>
    </>
  )
}

export default Notes
