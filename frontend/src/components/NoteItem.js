import { Card } from 'react-bootstrap'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

const NoteItem = props => {
  const { note } = props

  return (
    <Card bg="secondary" text="dark" border="dark" className="my-2">
      <Card.Header as="h5">#{note.tag}</Card.Header>
      <Card.Body>
        <Card.Title as="h4">{note.title}</Card.Title>
        <Card.Text>{note.description}</Card.Text>
        <hr />
        <small className="timestamps">
          <strong>Created:</strong>{' '}
          <span className="text-muted">
            {new Date(note.createdAt).toLocaleString()}
          </span>
        </small>
        <br />
        <small className="timestamps">
          <strong>Last Updated:</strong>{' '}
          <span className="text-muted">
            {new Date(note.updatedAt).toLocaleString()}
          </span>
        </small>
      </Card.Body>
      <Card.Footer className="d-flex align-items-center justify-content-center">
        <EditModal className="mx-2" note={note} />
        <DeleteModal className="mx-2" note={note} />
      </Card.Footer>
    </Card>
  )
}

export default NoteItem
