import { useState, useContext } from 'react'
import UserContext from '../context/users/UserContext'
import { Button, Modal } from 'react-bootstrap'

const DeleteProfileModal = () => {
  const [show, setShow] = useState(false)

  const context = useContext(UserContext)
  const { deleteProfile } = context

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSave = () => {
    deleteProfile()
    setShow(false)
  }

  return (
    <>
      <Button variant="danger" className="mb-2" onClick={handleShow}>
        <i className="fas fa-trash"></i> Delete Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete your profile! This will
          also remove all your saved notes.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteProfileModal
