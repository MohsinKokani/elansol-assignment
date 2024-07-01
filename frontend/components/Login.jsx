import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}api/login`, { email, password }, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/userdetails');
      setLoggedState(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">SIGN IN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/register" className="signinsignup-btn">Register</Link>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
