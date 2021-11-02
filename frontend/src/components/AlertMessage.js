import { Alert } from 'react-bootstrap'

const AlertMessage = ({ variant, children }) => {
  const style = {
    position: 'fixed',
    top: '88px',
    left: '20%',
    width: '60%',
    zIndex: '9999',
    margin: 'auto',
    marginTop: '10px',
    borderRadius: '5px',
    opacity: '.9',
    textAlign: 'center',
  }

  return (
    <Alert style={style} variant={variant}>
      <strong className="font-weight-bold">{children}</strong>
    </Alert>
  )
}

AlertMessage.defaultProps = {
  variant: 'info',
}

export default AlertMessage
