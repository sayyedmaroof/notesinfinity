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
    // updating client side
    setNotes(data)
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    const noteBody = {
      title,
      description,
      tag,
    }

    // api call
    const { data } = await axios.post(`${baseUrl}/notes/create`, noteBody, {
      headers,
    })

    // update in client
    setNotes(notes.concat(data))
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Api call using axios
    await axios.patch(
      `${baseUrl}/notes/mynotes/${id}`,
      { title, description, tag },
      {
        headers,
      }
    )
    // Updating in client
    // fetchNotes() : this will invoke another api call which results in high load on server
    const newNotes = notes.slice()
    newNotes.forEach((element, index) => {
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
      }
    })
    setNotes(newNotes)
  }

  // Delete a note
  const deleteNote = async id => {
    // Api call to delete note in server
    await axios.delete(`${baseUrl}/notes/mynotes/${id}`, {
      headers,
    })
    // Deleting in client
    const newNotes = notes.filter(note => note._id !== id)
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
