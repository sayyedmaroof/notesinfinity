import { Card } from 'react-bootstrap'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

const NoteItem = props => {
  const { note } = props

  return (
    <Card bg="secondary" text="dark" className="my-2">
      <Card.Header as="h5">#{note.tag}</Card.Header>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.description}</Card.Text>

        <EditModal className="mx-2" note={note} />

        <DeleteModal className="mx-2" note={note} />
      </Card.Body>
    </Card>
  )
}

export default NoteItem
