import NoteContext from './NoteContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

// axios config
const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxY2U2MGUzZWM1YmRlNTc5NzJiYTMiLCJpYXQiOjE2MzQ1NjY2MTh9.ApN76PWnUjHpsi2CiMPL_PsgZequumJmedQQyUdw2z4',
}

const NoteState = props => {
  const [notes, setNotes] = useState([])
  const [notesError, setNotesError] = useState(null)
  const [notesLoading, setNotesLoading] = useState(false)
  const [notesMessage, setNotesMessage] = useState(null)
  // const [notes]

  useEffect(() => {
    setTimeout(() => {
      setNotesError(null)
      setNotesMessage(null)
    }, 3000)
  }, [notesError, notesMessage])

  // fetch all notes
  const fetchNotes = async () => {
    try {
      setNotesLoading(true)
      // api call for fetching notes
      const response = await axios.get(`api/notes/mynotes`, { headers })
      // updating client side
      const data = response.data
      setNotesLoading(false)
      setNotes(data)
      setNotesError(null)
    } catch (err) {
      if (err.response) {
        setNotesError({ variant: 'danger', message: err.response.data.error })
      } else if (err.request) {
        setNotesError({ variant: 'danger', message: 'No response from server' })
      } else {
        setNotesError({ variant: 'danger', message: err.message })
      }

      setNotesLoading(false)
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
      setNotesLoading(true)
      const { data } = await axios.post(`api/notes/create`, noteBody, {
        headers,
      })
      // update in client
      setNotesLoading(false)
      setNotes(notes.concat(data))
      setNotesMessage({
        variant: 'success',
        message: 'Note added successfully!',
      })
      setNotesError(null)
    } catch (err) {
      if (err.response) {
        setNotesError({
          variant: 'danger',
          message: `Could not add the note! ${err.response.data.error}`,
        })
      } else if (err.request) {
        setNotesError({ variant: 'danger', message: 'No response from server' })
      } else {
        setNotesError({ variant: 'danger', message: err.message })
      }

      setNotesLoading(false)
    }
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      // Api call using axios
      setNotesLoading(true)
      await axios.patch(
        `api/notes/mynotes/${id}`,
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
      setNotesLoading(false)
      setNotes(newNotes)
      setNotesMessage({
        variant: 'success',
        message: 'Note Updated successfully!',
      })
      setNotesError(null)
    } catch (err) {
      if (err.response) {
        setNotesError({
          variant: 'danger',
          message: `Could not update the note! ${err.response.data.error}`,
        })
      } else if (err.request) {
        setNotesError({
          variant: 'danger',
          message: 'Could not delete the note! No response from server',
        })
      } else {
        setNotesError({ variant: 'danger', message: err.message })
      }

      setNotesLoading(false)
    }
  }

  // Delete a note
  const deleteNote = async id => {
    try {
      // Api call to delete note in server
      setNotesLoading(true)
      await axios.delete(`api/notes/mynotes/${id}`, {
        headers,
      })
      // Deleting in client
      const newNotes = notes.filter(note => note._id !== id)
      setNotesLoading(false)
      setNotes(newNotes)
      setNotesMessage({
        variant: 'info',
        message: 'Note was deleted',
      })
      setNotesError(null)
    } catch (err) {
      if (err.response) {
        setNotesError({
          variant: 'danger',
          message: `Could not delete the note! ${err.response.data.error}`,
        })
      } else if (err.request) {
        setNotesError({
          variant: 'danger',
          message: 'Could not delete the note! No response from server',
        })
      } else {
        setNotesError({ variant: 'danger', message: err.message })
      }
      setNotesLoading(false)
    }
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        notesError,
        notesLoading,
        notesMessage,
        fetchNotes,
        addNote,
        editNote,
        deleteNote,
      }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
