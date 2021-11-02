import { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Button, Form, Modal } from 'react-bootstrap'

const EditModal = props => {
  const [show, setShow] = useState(false)
  const [note, setNote] = useState(props.note)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onChangeHandler = e => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const context = useContext(NoteContext)
  const { editNote } = context

  const handleSave = () => {
    editNote(note._id, note.title, note.description, note.tag)
    setShow(false)
  }

  return (
    <>
      <Button size="sm" className="mx-2" variant="primary" onClick={handleShow}>
        <i className="fas fa-edit"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                {' '}
                <b>Title</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={note.title}
                placeholder="Enter title"
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {' '}
                <b>Description</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={note.description}
                placeholder="Enter description"
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
                value={note.tag}
                placeholder="Enter tag"
                onChange={onChangeHandler}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditModal
