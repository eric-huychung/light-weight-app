import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Nav from '../nav/Nav.jsx'
import Background from '../background/Background.jsx'
import './logExercises.scss'

const CreateExercise = () => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState(0); // Changed weight
  const [reps, setReps] = useState(0); // Changed 'duration' to 'reps'
  const [date, setDate] = useState(new Date()); // Keeping 'date' as is
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setExerciseName(response.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // Convert the selected date to a UTC string to avoid time zone issues
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

    const exercise = {
      exerciseName,
      sets,
      weight,
      reps, // Changed 'duration' to 'reps'
      date: utcDate,
    };

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/experiment';
  }

  return (
    <div className='logExercises'>
      <Nav />
      <Background />
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Choose Exercise: </label>
          <select
            required
            className="form-control"
            value={exerciseName}
            onChange={e => setExerciseName(e.target.value)}
          >
            {
              users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))
            }
          </select>
        </div>
        <div className="form-group"> 
          <label>Set Number: </label>
          <input
            type="text"
            required
            className="form-control"
            value={sets}
            onChange={e => setSets(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Weight: </label> {/* Changed label */}
          <input
            type="text" 
            className="form-control"
            value={weight}
            onChange={e => setWeight(e.target.value)} // Changed 'duration' to 'reps'
          />
        </div>
        <div className="form-group">
          <label>Reps: </label> {/* Changed label */}
          <input
            type="text" 
            className="form-control"
            value={reps}
            onChange={e => setReps(e.target.value)} // Changed 'duration' to 'reps'
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={newDate => setDate(newDate)}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Log Exercise" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
