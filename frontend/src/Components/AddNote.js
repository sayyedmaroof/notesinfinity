import React, { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {
  const context = useContext(NoteContext)
  const { addNote } = context

  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  })

  const onChangeHandler = e => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const addNoteHandler = e => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({ title: '', description: '', tag: '' })
  }

  return (
    <>
      <h2 className="my-3">Add a note!</h2>
      <Form onSubmit={addNoteHandler}>
        <Form.Group className="mb-3">
          <Form.Label>
            {' '}
            <b>Title</b>
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            value={note.title}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            {' '}
            <b>Description</b>
          </Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter description"
            value={note.description}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            {' '}
            <b>Tag</b>
          </Form.Label>
          <Form.Control
            type="text"
            name="tag"
            placeholder="Enter tag"
            value={note.tag}
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Note
        </Button>
      </Form>
    </>
  )
}

export default AddNote
