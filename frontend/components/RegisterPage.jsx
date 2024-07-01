import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = ({ setLoggedState }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post(`${(import.meta.env.VITE_BACKEND_DOMAIN)}api/register`, { name, dateOfBirth: dob, email, password }, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoggedState(true);
      navigate('/userdetails');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="form-group">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDob" className="form-group">
            <Form.Control
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="form-group">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
