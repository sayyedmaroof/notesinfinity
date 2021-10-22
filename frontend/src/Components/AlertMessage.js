import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertMessage = () => {
  return (
    <Alert variant="primary">
      This is a primary alert with{' '}
      <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
      like.
    </Alert>
  )
}

export default AlertMessage
