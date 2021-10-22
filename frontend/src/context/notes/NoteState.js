import NoteContext from './NoteContext'
import { useState } from 'react'
import axios from 'axios'

// axios config
const baseUrl = 'http://localhost:5000/api'
const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxY2U2MGUzZWM1YmRlNTc5NzJiYTMiLCJpYXQiOjE2MzQ1NjY2MTh9.ApN76PWnUjHpsi2CiMPL_PsgZequumJmedQQyUdw2z4',
}

const NoteState = props => {
  const [notes, setNotes] = useState([])

  // fetch all notes
  const fetchNotes = async () => {
    // api call for fetching notes
    const { data } = await axios.get(`${baseUrl}/notes/mynotes`, { headers })
    console.log(data)
    // updating client side
    setNotes(data)
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    const note = {
      title,
      description,
      tag,
    }

    // api call
    const { data } = await axios.post(`${baseUrl}/notes/create`, note, {
      headers,
    })
    console.log(data)

    // update in client
    setNotes(notes.concat(data))
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    console.log('Was clicked')
    const toEdit = notes.filter(note => note._id === id)
    const element = toEdit[0]

    console.log(toEdit)

    // Api call using axios
    // const response = await axios.patch(`${baseUrl}/notes/mynotes/${id}`)

    // setNotes(newNotes)
  }

  // Delete a note
  const deleteNote = async id => {
    // Api call to delete note in server
    const { data } = await axios.delete(`${baseUrl}/notes/mynotes/${id}`, {
      headers,
    })
    console.log(data)
    // Deleting in client
    const newNotes = notes.filter(note => note._id !== id)
    console.log(`Deleting this note with ${id}`)
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider
      value={{ notes, fetchNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
