import React from 'react';
import './index.scss';
import App from './components/App';
import Planspage from './pages/plansPage/Planspage.jsx'
import ExerciseList from "./components/exerciseList/exercise-list.component";
import EditExercise from "./components/editExercise/edit-exercise.component.jsx";
import CreateExercise from "./components/logExercises/create-exercise.component";
import CreateUser from "./components/addExercises/create-user.component";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';



import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  //Route,
  //Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  
  {
    path: "/plans",
    element: <Planspage />,
  },

  {
    path: "/experiment",
    element: <ExerciseList />,
  },

  {
    path: "/edit/:id",
    element: <EditExercise />,
  },

  {
    path: "/create",
    element: <CreateExercise />,
  },

  {
    path: "/user",
    element: <CreateUser />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
