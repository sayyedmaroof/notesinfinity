import { useState, useContext, useEffect } from 'react'
import UserContext from '../context/users/UserContext'
import { Button, Form, Modal } from 'react-bootstrap'

const EditProfileModal = () => {
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({})

  const context = useContext(UserContext)
  const { editProfile, readProfile } = context

  useEffect(() => {
    const fetchUser = async () => {
      const userProfile = await readProfile()
      setUser(userProfile)
    }
    fetchUser()

    // eslint-disable-next-line
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onChangeHandler = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    // editNote(note._id, note.title, note.description, note.tag)

    console.log('This will update the profile')
    editProfile(user.name, user.email, user.age, user.password)
    setShow(false)
  }

  return (
    <>
      <Button variant="secondary" className="mb-2" onClick={handleShow}>
        <i className="fas fa-edit"></i> Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                {' '}
                <b>Name</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user && user.name}
                placeholder="Enter Name"
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {' '}
                <b>Email</b>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user && user.email}
                placeholder="Enter email"
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {' '}
                <b>Age</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={user && user.age}
                placeholder="Enter age"
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {' '}
                <b>New Password</b>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user && user.password}
                placeholder="Enter Password"
                onChange={onChangeHandler}
              />
              <Form.Text className="text-muted">
                Enter new password if you wish to change your current password
              </Form.Text>
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

export default EditProfileModal
