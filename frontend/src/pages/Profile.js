import { useContext, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import DeleteProfileModal from '../components/DeleteProfileModal'
import EditProfileModal from '../components/EditProfileModal'
import UserContext from '../context/users/UserContext'

const Profile = () => {
  // for user context
  const userContext = useContext(UserContext)
  const { user } = userContext

  const history = useHistory()

  useEffect(() => {
    if (!user) {
      history.push('/')
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={10} md={6} xl={5}>
          <Card bg="dark" text="white" border="success" className="rounded p-3">
            <Card.Header>
              <span className="fa fa-user fa-5x  icon-logo"></span>
              <Card.Title className="text-center">
                <h3 className="my-3 text-white">{user && user.name}</h3>
              </Card.Title>
            </Card.Header>

            <Card.Body>
              <Row>
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
            </Card.Body>

            <Card.Footer text="white">
              <div className="d-grid gap-2">
                <EditProfileModal />
                <DeleteProfileModal />
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Profile
