import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import UserContext from '../context/users/UserContext'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  // for user context
  const userContext = useContext(UserContext)
  const { logout, logoutAll, user } = userContext

  const logoutHandler = () => {
    logout()
    history.push('/login')
  }

  const logoutAllHandler = () => {
    logoutAll()
    history.push('/login')
  }

  return (
    <Navbar
      className="sticky-top"
      bg="primary"
      variant="dark"
      expand="lg"
      collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Notes Infinity</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/" exact>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            {user ? (
              <NavDropdown title={user.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    <i className="fas fa-user"></i> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutAllHandler}>
                  <i className="fas fa-sign-out-alt"></i> Logout All <br />
                  Devices
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>
                    <i className="fas fa-user-plus"></i> Signup
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
