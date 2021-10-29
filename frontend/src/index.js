import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

// Context state
import NoteState from './context/notes/NoteState'
import UserState from './context/users/UserState'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserState>
        <NoteState>
          <App />
        </NoteState>
      </UserState>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
