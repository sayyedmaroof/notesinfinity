import { useContext } from 'react'
import UserContext from '../context/users/UserContext'
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import * as Yup from 'yup'
import { Formik } from 'formik'

const Login = () => {
  const userContext = useContext(UserContext)
  const { login } = userContext

  const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  })

  return (
    <Formik
      initialValues={{
        email: '',

        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        try {
          login(values.email, values.password)
          setSubmitting(false)
        } catch (err) {
          console.log(err.message)
        }
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
      }) => (
        <>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <h3>This is login page and you can login </h3>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <FormControl.Feedback type="invalid">
                    {errors.email}
                  </FormControl.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.password}
                  </FormControl.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Signup
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  New User? <Link to="/signup">Signup</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Formik>
  )
}

export default Login
