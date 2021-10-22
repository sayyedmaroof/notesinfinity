import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Button, Card } from 'react-bootstrap'

const NoteItem = props => {
  const { note } = props

  const context = useContext(NoteContext)
  const { deleteNote, editNote } = context

  return (
    <Card bg="secondary" text="dark" className="my-2">
      <Card.Header as="h5">#{note.tag}</Card.Header>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.description}</Card.Text>
        <Button
          variant="primary"
          size="sm"
          className="mx-2"
          onClick={() => editNote()}>
          <i className="fas fa-edit"></i>
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="mx-2"
          onClick={() => deleteNote(note._id)}>
          <i className="fas fa-trash"></i>
        </Button>
      </Card.Body>
    </Card>
  )
}

export default NoteItem
