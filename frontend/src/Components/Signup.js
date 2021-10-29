import { useContext } from 'react'
import UserContext from '../context/users/UserContext'
import { Button, Col, Form, Row, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import * as Yup from 'yup'
import { Formik } from 'formik'

const Signup = () => {
  const userContext = useContext(UserContext)
  const { signup } = userContext

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be atleast 3 or more characters')
      .max(20, 'Must be 20 characters or less')
      .required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
    age: Yup.number().positive().integer().typeError('Age must be a number'),
  })

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // When button submits form and form is in the process of submitting, submit button is disabled
        setSubmitting(true)

        // Simulate submitting to database, shows us values submitted, resets form
        try {
          signup(values.name, values.email, values.password, values.age)
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
              <h2>Welcome to signup page</h2>

              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

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
                  <Form.Label>Enter Your Age</Form.Label>
                  <Form.Control
                    name="age"
                    type="text"
                    placeholder="Enter age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    isValid={touched.age && !errors.age}
                    isInvalid={touched.age && errors.age}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.age}
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

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.confirmPassword}
                  </FormControl.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Signup
                </Button>
              </Form>

              <Row className="py-3">
                <Col>
                  Already have an account? <Link to="/login">Login</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Formik>
  )
}

export default Signup
