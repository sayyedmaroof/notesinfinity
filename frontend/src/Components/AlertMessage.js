import { Alert } from 'react-bootstrap'

const AlertMessage = ({ variant, children }) => {
  const style = {
    position: 'sticky',
    top: '0px',
    left: '0px',
    width: '64%',
    zIndex: '9999',
    borderRadius: '0px',
    margin: 'auto',
  }

  return (
    <Alert style={style} variant={variant}>
      {children}
    </Alert>
  )
}

AlertMessage.defaultProps = {
  variant: 'info',
}

export default AlertMessage
