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
  const [error, setError] = useState(null)

  // fetch all notes
  const fetchNotes = async () => {
    try {
      // api call for fetching notes
      const response = await axios.get(`${baseUrl}/notes/mynotes`, { headers })
      // updating client side
      const data = response.data
      setNotes(data)
      setError(null)
    } catch (err) {
      if (err.response) {
        setError({ variant: 'danger', message: err.response.data.error })
      } else if (err.request) {
        setError({ variant: 'danger', message: 'No response from server' })
      } else {
        setError({ variant: 'danger', message: err.message })
      }
      // console.log(error)
    }
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    const noteBody = {
      title,
      description,
      tag,
    }
    try {
      // api call
      const { data } = await axios.post(`${baseUrl}/notes/create`, noteBody, {
        headers,
      })
      // update in client
      setNotes(notes.concat(data))
      setError(null)
    } catch (err) {
      if (err.response) {
        setError({
          variant: 'danger',
          message: `Could not add the note! ${err.response.data.error}`,
        })
      } else if (err.request) {
        setError({ variant: 'danger', message: 'No response from server' })
      } else {
        setError({ variant: 'danger', message: err.message })
      }
    }
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
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
      newNotes.forEach((element, i) => {
        if (element._id === id) {
          newNotes[i].title = title
          newNotes[i].description = description
          newNotes[i].tag = tag
        }
      })
      setNotes(newNotes)
      setError(null)
    } catch (err) {
      if (err.response) {
        setError({
          variant: 'danger',
          message: `Could not update the note! ${err.response.data.error}`,
        })
      } else if (err.request) {
        setError({ variant: 'danger', message: 'No response from server' })
      } else {
        setError({ variant: 'danger', message: err.message })
      }
    }
  }

  // Delete a note
  const deleteNote = async id => {
    try {
      // Api call to delete note in server
      await axios.delete(`${baseUrl}/notes/mynotes/${id}`, {
        headers,
      })
      // Deleting in client
      const newNotes = notes.filter(note => note._id !== id)
      setNotes(newNotes)
      setError(null)
    } catch (err) {
      if (err.response) {
        setError({ variant: 'danger', message: err.response.data.error })
      } else if (err.request) {
        setError({ variant: 'danger', message: 'No response from server' })
      } else {
        setError({ variant: 'danger', message: err.message })
      }
    }
  }

  return (
    <NoteContext.Provider
      value={{ notes, error, fetchNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
