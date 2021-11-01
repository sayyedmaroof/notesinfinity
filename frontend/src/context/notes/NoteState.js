import { useEffect, useState } from 'react'
import NoteContext from './NoteContext'
import axios from 'axios'

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

const NoteState = props => {
  const [notes, setNotes] = useState([])
  const [notesError, setNotesError] = useState(null)
  const [notesLoading, setNotesLoading] = useState(false)
  const [notesMessage, setNotesMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setNotesError(null)
      setNotesMessage(null)
    }, 3000)
  }, [notesError, notesMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      if (
        err.response.status === 401 &&
        err.response.statusText === 'Unauthorized'
      ) {
        localStorage.removeItem('userInfo')
      }
      setNotesError({
        variant: 'danger',
        message: `${info} ${err.response.data.error}`,
      })
    } else if (err.request) {
      setNotesError({
        variant: 'danger',
        message: `${info} No response from server!`,
      })
    } else {
      setNotesError({ variant: 'danger', message: err.message })
    }
    setNotesLoading(false)
  }

  // -----------------------------------------------------------------
  // Fetch all notes
  // -----------------------------------------------------------------
  const fetchNotes = async () => {
    try {
      setNotesLoading(true)
      // for getting the newly saved token from the local storage we have written this extra code for this pariticular function
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      // api call for fetching notes
      const response = await axios.get(`api/notes/mynotes`, { headers })
      // updating client side
      const data = response.data
      setNotesLoading(false)
      setNotes(data)
      setNotesError(null)
    } catch (err) {
      errorHandler(err, 'Could not fetch notes!')
    }
  }

  // -----------------------------------------------------------------
  // Add a note
  // -----------------------------------------------------------------
  const addNote = async (title, description, tag) => {
    const noteBody = clean({
      title,
      description,
      tag,
    })
    try {
      // api call
      setNotesLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
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
      errorHandler(err, 'Could not add the note!')
    }
  }

  // -----------------------------------------------------------------
  // Edit a note
  // -----------------------------------------------------------------
  const editNote = async (id, title, description, tag) => {
    try {
      // Api call using axios
      setNotesLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const noteBody = clean({ title, description, tag })
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      await axios.patch(`api/notes/mynotes/${id}`, noteBody, {
        headers,
      })
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
      errorHandler(err, 'Could not update the note!')
    }
  }

  // -----------------------------------------------------------------
  // Delete a note
  // -----------------------------------------------------------------
  const deleteNote = async id => {
    try {
      // Api call to delete note in server
      setNotesLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
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
      errorHandler(err, 'Could not delete the note!')
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
