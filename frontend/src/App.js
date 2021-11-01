import './App.css'
import { useContext } from 'react'
import { Route } from 'react-router-dom'

// components
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Loader from './components/Loader'
import AlertMessage from './components/AlertMessage'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'

// context
import NoteContext from './context/notes/NoteContext'
import UserContext from './context/users/UserContext'
import Profile from './pages/Profile'
import Footer from './components/Footer'

function App() {
  // for note context
  const noteContext = useContext(NoteContext)
  const { notesError, notesLoading, notesMessage } = noteContext

  // for user context
  const userContext = useContext(UserContext)
  const { userError, userLoading, userMessage } = userContext

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="py-3">
        {notesLoading && <Loader />}
        {userLoading && <Loader />}

        {notesError && (
          <AlertMessage variant={notesError.variant}>
            {notesError.message}
          </AlertMessage>
        )}
        {userError && (
          <AlertMessage variant={userError.variant}>
            {userError.message}
          </AlertMessage>
        )}

        {notesMessage && (
          <AlertMessage variant={notesMessage.variant}>
            {notesMessage.message}
          </AlertMessage>
        )}

        {userMessage && (
          <AlertMessage variant={userMessage.variant}>
            {userMessage.message}
          </AlertMessage>
        )}

        <Container>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
