import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './userDetails.css';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include", // To include cookies
        };
        fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}api/userData`, options)
          .then(response => response.json())
          .then(response => {
            console.log(response)
            if (response.sucess == false) {
              navigate('/login');
              return;
            }
            setUsers(response.data);
          })
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <h2>User Details</h2>
      <Table striped bordered hover className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  <span>{user.name}</span>
                </div>
              </td>
              <td>{user.date_created}</td>
              <td>{user.role}</td>
              <td className={`status ${user.status.toLowerCase()}`}>{user.status}</td>
              <td>
                <span className="action-btn edit-btn">⚙️</span>
                <span className="action-btn delete-btn">❌</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserDetails;
