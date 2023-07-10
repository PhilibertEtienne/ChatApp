import React, { useState } from 'react'
import { Row, Col, Form, Button } from'react-bootstrap';

export default function Register() {
    
    const [ variables, setVariables ] = useState({
        email: '',
        username:'',
        password:'',
        confirmPassword:''
      });
    const submitRegisterForm = e =>{
      e.preventDefault();
      console.log(variables);
    }

  return (
    <Row className='bg-white py-5 justify-content-center'>
    <Col sm={8} md={6} lg={4}>
    <h1 className="text-center">Register</h1>
      <Form onSubmit={submitRegisterForm}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={variables.email} onChange={e => setVariables({...variables,email: e.target.value})}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={variables.username} onChange={e => setVariables({...variables,username: e.target.value})}/>
        </Form.Group>
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={variables.password} onChange={e => setVariables({...variables,password: e.target.value})}/>
        </Form.Group>
        <Form.Group >
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={variables.confirmPassword} onChange={e => setVariables({...variables,confirmPassword: e.target.value})}/>
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </Col>
  </Row>
  )
}