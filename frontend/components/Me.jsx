import React, { useEffect, useState } from 'react';
import "./me.css";

const Me = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData).user;
      setUser(parsedUserData);
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      {user ? (
        <div className="details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Date of Birth:</strong> {formatDate(user.dateOfBirth)}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Me;
