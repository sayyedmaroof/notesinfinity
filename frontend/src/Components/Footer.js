import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-primary mt-auto">
      <Container>
        <Row>
          <Col className="text-center py-3 ">
            <strong className="text-white">
              Copyright &copy; NotesInfinity
            </strong>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
