import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '15vw',
        height: '15vw',
        margin: 'auto',
        display: 'block',
        position: 'fixed',
        top: '30%',
        left: '40%',
        zIndex: '9999',
      }}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default Loader
