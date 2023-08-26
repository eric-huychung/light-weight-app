import React from 'react'
import './background.scss'
import Image from '../../assets/background.svg'

function Background() {
  return (
    <div>
        <img className='background' src={Image} alt="background" />
    </div>
  )
}

export default Background