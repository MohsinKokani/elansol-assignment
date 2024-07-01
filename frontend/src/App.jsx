import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Login from '../components/Login.jsx';
import Register from '../components/RegisterPage.jsx';
import UserDetails from '../components/UserDetails.jsx';
import Navbar from '../components/Navbar.jsx';
import Me from '../components/Me.jsx';

export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

function App() {
  const [loggedState, setLoggedState] = useState(isAuthenticated());
  return (
    <>
      <BrowserRouter>
        <Navbar loggedState={loggedState} setLoggedState={setLoggedState} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<Me />} />
          <Route path="/login" element={<Login loggedState={loggedState} setLoggedState={setLoggedState}/>} />
          <Route path="/register" element={<Register loggedState={loggedState} setLoggedState={setLoggedState}/>} />
          <Route path="/userdetails" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
