import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../nav/Nav.jsx'
import { Link } from 'react-router-dom';
import './addExercise.scss'


const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username
    };

    axios.post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log(res.data);
        setUsername('');
        fetchUsers(); // Update the user list after creating a user
      })
      .catch(err => console.log(err));
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(res => {
        console.log(res.data);
        setUsers(users.filter(user => user._id !== id)); // Update the user list after deleting a user
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="addExercise">
      <Nav />
      <div className="form-group">
          <Link to="/experiment">
            <input 
            type="button" 
            value="View Logged Data" 
            className="btn btn-primary"
            />
          </Link>
          
      </div>

        <form onSubmit={onSubmit} className="exerciseInput">
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control"
              placeholder="Add New Exercises..."
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Enter" className="btn btn-primary" />
          </div>
        </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username}{' '}
            <button onClick={() => deleteUser(user._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateUser;
