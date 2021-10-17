import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import About from './Components/About'

function App() {
  return (
    <Router>
      <Header />
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Router>
  )
}

export default App
