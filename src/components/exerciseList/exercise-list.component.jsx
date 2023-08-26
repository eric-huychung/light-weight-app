import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../nav/Nav.jsx';
import './exerciseList.scss';

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.exerciseName}</td>
    <td>{exercise.sets}</td>
    <td>{exercise.weight}</td>
    <td>{exercise.reps}</td>
    <td>{exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${exercise._id}`}>edit</Link> |{' '}
      <a href="#" onClick={() => deleteExercise(exercise._id)}>
        delete
      </a>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseName, setSelectedExerciseName] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`).then((response) => {
      console.log(response.data);
    });

    setExercises(exercises.filter((el) => el._id !== id));
    setFilteredExercises(filteredExercises.filter((el) => el._id !== id));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then((response) => {
        const sortedExercises = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExercises(sortedExercises);
        setFilteredExercises(sortedExercises);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedExerciseName) {
      const filteredData = exercises.filter(exercise => exercise.exerciseName === selectedExerciseName);
      setFilteredExercises(filteredData);
    } else {
      setFilteredExercises(exercises);
    }
  }, [selectedExerciseName, exercises]);

  const exerciseList = filteredExercises.map((currentExercise) => (
    <Exercise
      exercise={currentExercise}
      deleteExercise={deleteExercise}
      key={currentExercise._id}
    />
  ));

  const exerciseNames = [...new Set(exercises.map(exercise => exercise.exerciseName))];

  return (
    <div className='exerciseList'>
      <Nav />
      
      <div>
        <label className='filterLabel'>Filter by Exercise Name: </label>
        <select value={selectedExerciseName} onChange={(e) => setSelectedExerciseName(e.target.value)}>
          <option value="">All Exercises</option>
          {exerciseNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
      </div>
      
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Exercise</th>
            <th>Set#</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
