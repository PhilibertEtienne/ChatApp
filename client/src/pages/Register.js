import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom";


const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`

export default function Register(props) {
  const navigate = useNavigate();
  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  console.log(props.history)
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => navigate('/login'),
    onError: (err) => setErrors(err.graphQLErrors[0]?.extensions.errors),
  })
  const submitRegisterForm = (e) => {
    e.preventDefault()

    registerUser({ variables })
  }


  return (
    <Row className='bg-white py-5 justify-content-center'>
    <Col sm={8} md={6} lg={4}>
    <h1 className="text-center">Register</h1>
      <Form onSubmit={submitRegisterForm}>
        <Form.Group>
          <Form.Label className={errors && errors.email ? 'text-danger': ''}>
            Email adress
          </Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={variables && variables.email} className={errors && errors.email && 'is-invalid'} onChange={e => setVariables({...variables,email: e.target.value})}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label className={errors?.username && 'text-danger'}>
              {(errors && errors.username) ?? 'Username'}
          </Form.Label>

          <Form.Control type="text" placeholder="Enter username" value={variables && variables.username} className={errors && errors.username && 'is-invalid'} onChange={e => setVariables({...variables,username: e.target.value})}/>
        </Form.Group>
        <Form.Group >
          <Form.Label className={errors && errors?.password && 'text-danger'}>
            {(errors && errors.password) ?? 'Password'}
          </Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={variables && variables.password} className={errors && errors.password && 'is-invalid'}  onChange={e => setVariables({...variables,password: e.target.value})}/>
        </Form.Group>
        <Form.Group >
          <Form.Label className={errors?.confirmPassword && 'text-danger'}>
            {(errors && errors.confirmPassword) ?? 'Confirm Password'}
          </Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={variables && variables.confirmPassword} className={errors && errors.confirmPassword && 'is-invalid'} onChange={e => setVariables({...variables,confirmPassword: e.target.value})}/>
        </Form.Group>
        <Button variant="success" type="submit" disabled={loading}>
          { loading ? 'loading..' : 'Register'}
        </Button>
        <br></br>
          <small>Already have an account ? <Link to="/login"> Login</Link> </small>
      </Form>
    </Col>
  </Row>
  )
}
