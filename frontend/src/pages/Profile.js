import { useContext, useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Modal,
  Image,
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DeleteProfileModal from '../components/DeleteProfileModal'
import EditProfileModal from '../components/EditProfileModal'
import UserContext from '../context/users/UserContext'

const Profile = () => {
  const inputRef = useRef(null)
  const history = useHistory()

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
    setSelectedFile(null)
  }
  const handleShow = () => setShow(true)

  // for user context
  const userContext = useContext(UserContext)
  const { user, uploadPicture, deleteProfilePicture } = userContext

  const [selectedFile, setSelectedFile] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const getPic = async () => {
    const bypassCache = new Date().getTime()
    setImageSrc(`api/users/${user._id}/avatar?${bypassCache}`)
  }

  useEffect(() => {
    if (!user) {
      history.push('/')
    }
    // eslint-disable-next-line
  }, [user])

  console.log(imageSrc)

  useEffect(() => {
    getPic()
    // eslint-disable-next-line
  }, [])

  const fileSelectedHandler = e => {
    setSelectedFile(e.target.files[0])
  }

  const onUploadHandler = async () => {
    try {
      const fd = new FormData()
      fd.append('avatar', selectedFile, selectedFile.name)
      await uploadPicture(fd)
      handleClose()
      // setImageSrc(`api/users/${user._id}/avatar`)
      getPic()
    } catch (err) {
      setSelectedFile(null)
    }
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={10} md={6} xl={5}>
          <Card bg="dark" text="white" border="success" className="rounded p-3">
            <Card.Img
              variant="top"
              src={imageSrc}
              key={imageSrc}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src =
                  'https://i.pinimg.com/280x280_RS/5e/db/c8/5edbc8d75a4eae64500882184fd383b6.jpg'
                setImageSrc(
                  'https://i.pinimg.com/280x280_RS/5e/db/c8/5edbc8d75a4eae64500882184fd383b6.jpg'
                )
              }}
            />
            <Card.Header>
              <Card.Title className="text-center">
                <h3 className="my-3 text-white">{user && user.name}</h3>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Button variant="primary" onClick={handleShow}>
                Updload New Image
              </Button>
            </Card.Body>
            <Card.Footer text="dark">
              {imageSrc &&
                imageSrc !==
                  'https://i.pinimg.com/280x280_RS/5e/db/c8/5edbc8d75a4eae64500882184fd383b6.jpg' && (
                  <Button
                    className="my-2"
                    variant="danger"
                    onClick={async () => {
                      await deleteProfilePicture()
                      setImageSrc(
                        'https://i.pinimg.com/280x280_RS/5e/db/c8/5edbc8d75a4eae64500882184fd383b6.jpg'
                      )
                    }}>
                    Delete Profile Pic
                  </Button>
                )}
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6}>
          <Container>
            <Row>
              <h2>{user && user.name}</h2>
              <Col xs={4}>
                <strong>Email: </strong>
              </Col>
              <Col xs={8}>{user && user.email}</Col>
              <hr />
              <Col xs={4}>
                <strong>Age: </strong>
              </Col>
              <Col xs={8}>{user && user.age}</Col>
              <hr />
              <Col xs={4}>
                <strong>Joining Date: </strong>
              </Col>
              <Col xs={8}>
                {new Date(user && user.createdAt).toLocaleString()}
              </Col>
              <hr />
            </Row>
            <div className="d-grid gap-2">
              <EditProfileModal />
              <DeleteProfileModal />
            </div>
          </Container>
        </Col>
      </Row>

      {/* preview modal starts here  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFile && (
            <>
              <Image
                src={selectedFile && URL.createObjectURL(selectedFile)}
                alt="Thumb"
                fluid
              />

              <Button onClick={() => setSelectedFile(null)}>
                Remove This Image
              </Button>
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="mx-3">
              {selectedFile ? selectedFile.name : 'No file selected'}
            </Form.Label>
            <Form.Control
              ref={inputRef}
              className="d-none"
              type="file"
              onChange={fileSelectedHandler}
            />
            {!selectedFile && (
              <Button
                onClick={() => {
                  inputRef.current.click()
                }}>
                Choose File
              </Button>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {selectedFile && (
            <Button variant="primary" onClick={onUploadHandler}>
              Upload
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Profile
