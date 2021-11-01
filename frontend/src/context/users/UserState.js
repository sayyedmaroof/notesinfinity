import UserContext from './UserContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

const UserState = props => {
  // for Redirect
  const history = useHistory()

  // axios config
  const userToken = JSON.parse(localStorage.getItem('userToken'))
  const headers = {
    Authorization: `Bearer ${userToken && userToken}`,
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [user, setUser] = useState(userInfo || null)
  const [userError, setUserError] = useState(null)
  const [userLoading, setUserLoading] = useState(false)
  const [userMessage, setUserMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setUserMessage(null)
      setUserError(null)
    }, 3000)
  }, [userMessage, userError])

  // -----------------------------------------------------------------
  // Login user
  // -----------------------------------------------------------------
  const login = async (email, password) => {
    try {
      setUserLoading(true)
      const { data } = await axios.post(`api/users/login`, {
        email,
        password,
      })
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
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

  // -----------------------------------------------------------------
  // Signup a new user
  // -----------------------------------------------------------------
  const signup = async (name, email, password, age) => {
    try {
      const body = clean({ name, email, password, age })
      setUserLoading(true)
      const { data } = await axios.post(`api/users/register`, body)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
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

  // -----------------------------------------------------------------
  // Logout a user
  // -----------------------------------------------------------------
  const logout = async () => {
    try {
      setUserLoading(true)
      await axios.post(`api/users/logout`, null, {
        headers,
      })
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      setUser(null)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'dark', message: 'You have logged out!' })
      history.push('/login')
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

  // -----------------------------------------------------------------
  // Read user profile
  // -----------------------------------------------------------------
  const readProfile = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get('api/users/me', { headers })
      setUserError(null)
      setUserLoading(false)
      return data
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

  // -----------------------------------------------------------------
  // Edit Profile
  // -----------------------------------------------------------------
  const editProfile = async (name, email, age, password) => {
    try {
      setUserLoading(true)
      const body = clean({ name, email, age, password })
      const { data } = await axios.patch('api/users/me', body, { headers })
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUserError(null)
      setUserLoading(false)
      setUserMessage({
        variant: 'success',
        message: 'Your profile was updated successfully',
      })
      return data
    } catch (err) {
      if (err.response) {
        setUserError({
          variant: 'danger',
          message: `Could not update your profile! ${err.response.data.error}`,
        })
      } else if (err.request) {
        setUserError({
          variant: 'danger',
          message: 'Could note update your profile! No response from server',
        })
      } else {
        setUserError({
          variant: 'danger',
          message: `Could not update your profile! ${err.message}`,
        })
      }
      setUserLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userError,
        userLoading,
        userMessage,
        login,
        signup,
        logout,
        readProfile,
        editProfile,
      }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
