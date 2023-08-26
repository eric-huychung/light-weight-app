import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

const EditExercise = () => {
  const { id } = useParams();

  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0); // Changed 'duration' to 'reps'
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then(response => {
        setExerciseName(response.data.exerciseName);
        setSets(response.data.sets);
        setWeight(response.data.weight);
        setReps(response.data.reps); // Changed 'duration' to 'reps'
        setDate(new Date(response.data.date));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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

    axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then(res => console.log(res.data));

    window.location = '/experiment';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Exercise Name: </label>
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
          <label>Sets: </label>
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
            onChange={e => setWeight(e.target.value)} 
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
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
