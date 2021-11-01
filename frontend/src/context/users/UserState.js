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

  // for disabling the alert messages after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setUserMessage(null)
      setUserError(null)
    }, 3000)
  }, [userMessage, userError])

  // Error handler funtion
  const errorHandler = (err, info) => {
    if (info === undefined || null) {
      info = ''
    }
    if (err.response) {
      if (
        err.response.status === 401 &&
        err.response.statusText === 'Unauthorized'
      ) {
        localStorage.removeItem('userInfo')
      }
      setUserError({
        variant: 'danger',
        message: `${info} ${err.response.data.error}`,
      })
    } else if (err.request) {
      setUserError({
        variant: 'danger',
        message: `${info} No response from server`,
      })
    } else {
      setUserError({ variant: 'danger', message: err.message })
    }
    setUserLoading(false)
  }

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
      errorHandler(err)
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
      errorHandler(err)
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
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Logout from all devices
  // -----------------------------------------------------------------
  const logoutAll = async () => {
    try {
      setUserLoading(true)
      await axios.post(`api/users/logoutall`, null, {
        headers,
      })
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      setUser(null)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({
        variant: 'dark',
        message: 'You have successfully logged out from all devices!',
      })
      history.push('/login')
    } catch (err) {
      errorHandler(err)
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
      errorHandler(err)
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
      errorHandler(err, 'Could not update your profile!')
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
        logoutAll,
        readProfile,
        editProfile,
      }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
