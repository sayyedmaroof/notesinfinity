import { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Col, Row } from 'react-bootstrap'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const context = useContext(NoteContext)
  const { notes, fetchNotes } = context

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <AddNote />

      <h2 className="my-3">Your Notes</h2>
      <Row>
        {notes.map(note => (
          <Col key={note._id} md={4} sm={6} lg={3}>
            <NoteItem note={note} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Notes
