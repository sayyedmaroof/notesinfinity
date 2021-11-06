import { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Link } from 'react-router-dom'
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Navbar,
  Row,
  Spinner,
} from 'react-bootstrap'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
  const limit = 10
  const [skip, setSkip] = useState(0)
  const [keyWord, setKeyWord] = useState('')
  const [totalResults, setTotalResults] = useState(0)

  const context = useContext(NoteContext)
  const { notes, fetchNotes, notesLoading } = context

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    const populateNotes = async () => {
      setTotalResults(await fetchNotes(limit, skip, keyWord))
    }
    populateNotes()
    // eslint-disable-next-line
  }, [skip, limit])

  const handleChange = e => {
    setKeyWord(e.target.value)
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    const populateNotes = async () => {
      setTotalResults(await fetchNotes(limit, skip, keyWord))
    }
    setSkip(0)
    populateNotes()
  }

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit)
    }
    // await fetchNotes(limit, skip, keyWord)
  }

  const handleNextClick = async () => {
    setSkip(skip + limit)
    await fetchNotes(limit, skip, keyWord)
  }

  return (
    <>
      <AddNote />

      <Navbar
        className="my-3"
        expand="lg"
        variant="light"
        bg="light"
        style={{ padding: '10px 5px' }}>
        <Container>
          <Navbar.Brand>
            <h2>Your Notes</h2>
          </Navbar.Brand>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search your notes"
              className="me-2"
              aria-label="Search"
              minLength={3}
              size="sm"
              value={keyWord}
              onChange={handleChange}
            />
            <Button type="submit" variant="outline-dark" size="sm">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>

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
            {notes.length === 0 ? (
              <Alert variant="info">
                <Alert.Heading>Note notes to show</Alert.Heading>
                <p>Please add a note to dispaly here</p>
              </Alert>
            ) : (
              <div className="d-flex justify-content-between align-items-center my-3">
                {notesLoading ? (
                  <Button variant="success" size="sm" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handlePreviousClick}
                    disabled={skip < 1}>
                    &larr; Previous
                  </Button>
                )}

                <div className="text-muted text-center mx-2">
                  Showing {limit < totalResults ? limit : totalResults} notes
                  out of {totalResults}
                </div>

                {notesLoading ? (
                  <Button variant="success" size="sm" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleNextClick}
                    disabled={totalResults - skip <= limit}>
                    Next &rarr;
                  </Button>
                )}
              </div>
            )}
          </>
        )}

        <Row>
          {notes.map(note => (
            <Col key={note._id} md={6} sm={6} lg={4} xl={3}>
              <NoteItem note={note} />
            </Col>
          ))}
        </Row>
      </>
    </>
  )
}

export default Notes
