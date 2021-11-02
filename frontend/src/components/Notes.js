import { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Link } from 'react-router-dom'
import { Alert, Col, Row } from 'react-bootstrap'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const context = useContext(NoteContext)
  const { notes, fetchNotes } = context

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <AddNote />

      <h2 className="my-3">Your Notes</h2>

      <>
        {!userInfo ? (
          <>
            <Alert variant="info">
              <Alert.Heading>Note notes to show</Alert.Heading>
              <p>Please login to the app to view your notes</p>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <p>
                New User? <Link to="/signup">Signup</Link>
              </p>
            </Alert>
          </>
        ) : (
          <>
            {notes.length === 0 && (
              <Alert variant="info">
                <Alert.Heading>Note notes to show</Alert.Heading>
                <p>Please add a note to dispaly here</p>
              </Alert>
            )}
          </>
        )}

        <Row>
          {notes.map(note => (
            <Col key={note._id} md={4} sm={6} lg={3}>
              <NoteItem note={note} />
            </Col>
          ))}
        </Row>
      </>
    </>
  )
}

export default Notes
