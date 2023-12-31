import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

export default function Login(props) {
  const [variables, setVariables] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Use the useNavigate hook

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0]?.extensions.errors),
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      navigate('/');  // Use the navigate function to redirect
    }
  });

  const submitLoginForm = (e) => {
    e.preventDefault();

    loginUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLoginForm}>
          <Form.Group>
            <Form.Label className={errors.username && 'text-danger'}>
              {errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={variables.username}
              className={errors.username && 'is-invalid'}
              onChange={(e) => setVariables({ ...variables, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && 'text-danger'}>
              {errors.password ?? 'Password'}
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={variables.password}
              className={errors.password && 'is-invalid'}
              onChange={(e) => setVariables({ ...variables, password: e.target.value })}
            />
          </Form.Group>
          <Button variant="success" type="submit" disabled={loading} className="my-3">
            {loading ? 'loading..' : 'Login'}
          </Button>
          <br></br>
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </Form>
      </Col>
    </Row>
  );
}