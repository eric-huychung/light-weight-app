import React from 'react'
import './nav.scss';
import Logo from '../../assets/logo.svg'
import PlusButton from '../button/PlusButton.jsx'

import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className="nav">
            <h1><Link to="/">PROFILE</Link></h1>
            <div className="btn-center">
                <Link to="/create">
                    <PlusButton />
                </Link>
            </div>
            
            <div>
                <img className='logo' src={Logo} alt="logo" />
            </div>
            <h1><Link to="/plans">JOURNAL</Link></h1>
           
        </div>
    );
}

export default Nav;