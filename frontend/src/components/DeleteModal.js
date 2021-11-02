import { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Button, Modal } from 'react-bootstrap'

const DeleteModal = props => {
  const { note } = props

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const context = useContext(NoteContext)
  const { deleteNote } = context

  const handleConfirmDelete = () => {
    deleteNote(note._id)
    setShow(false)
  }

  return (
    <>
      <Button size="sm" variant="primary" className="mx-2" onClick={handleShow}>
        <i className="fas fa-trash"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete This Note !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete this note with the tilte:
          <strong> {note.title} </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal
