import UserContext from './UserContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

// axios config
// const baseUrl = 'http://localhost:5000/api'

const UserState = props => {
  // for Redirect
  const history = useHistory()

  const [userInfo, setUserInfo] = useState(null)
  const [userError, setUserError] = useState(null)
  const [userLoading, setUserLoading] = useState(false)
  const [userMessage, setUserMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setUserMessage(null)
      setUserError(null)
    }, 3000)
  }, [userMessage, userError])

  // Login user
  const login = async (email, password) => {
    try {
      setUserLoading(true)
      const { data } = await axios.post(`api/users/login`, {
        email,
        password,
      })
      setUserInfo(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'success', message: 'Logged In successfully' })
      history.push('/')
    } catch (err) {
      if (err.response) {
        setUserError({ variant: 'danger', message: err.response.data.error })
      } else if (err.request) {
        setUserError({ variant: 'danger', message: 'No response from server' })
      } else {
        setUserError({ variant: 'danger', message: err.message })
      }

      setUserLoading(false)
    }
  }

  // Signup a new user
  const signup = async (name, email, password, age) => {
    try {
      setUserLoading(true)
      const { data } = await axios.post(`api/users/register`, {
        name,
        email,
        password,
        age,
      })
      setUserInfo(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'success', message: 'Signed up successfully' })
      history.push('/')
    } catch (err) {
      if (err.response) {
        setUserError({ variant: 'danger', message: err.response.data.error })
      } else if (err.request) {
        setUserError({ variant: 'danger', message: 'No response from server' })
      } else {
        setUserError({ variant: 'danger', message: err.message })
      }

      setUserLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{ userInfo, userError, userLoading, userMessage, login, signup }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
