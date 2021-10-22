import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState'
import { Container } from 'react-bootstrap'
import AlertMessage from './components/AlertMessage'

function App() {
  return (
    <NoteState>
      <Router>
        <Header />
        <main className="py-3">
          <AlertMessage />
          <Container>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Container>
        </main>
      </Router>
    </NoteState>
  )
}

export default App
