import React from 'react'
import Background from '../../components/background/Background.jsx'
import Nav from '../../components/nav/Nav.jsx'
import './planspage.scss'
import CreateExercise from '../../components/addExercises/create-user.component.jsx'


function PlansPage() {
  return (
    <>
        <Background />
        <Nav />
        <div className='header'>
          <h1 className='neonText'>Add Exercises</h1>
        </div>

        <CreateExercise />
        

    </>
  )
}

export default PlansPage