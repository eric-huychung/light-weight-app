import React, { useState, useEffect } from 'react'
import './header.scss'
import EdiText from 'react-editext'; 


function Header() {

    const [name, editName] = useState("Edit Your Name");
    const [weight, editWeight] = useState("Edit Your Weight");

    // Load data from local storage on component mount
    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedWeight = localStorage.getItem('weight');

        if (storedName) {
            editName(storedName);
        }

        if (storedWeight) {
            editWeight(storedWeight);
        }
    }, []);

    const handleNameSave = (value) => {
        console.log(value);
        editName(value);
        localStorage.setItem('name', value); // Save to local storage
    };

    const handleWeightSave = (value) => {
        console.log(value);
        editWeight(value);
        localStorage.setItem('weight', value); // Save to local storage
    };


    return (
        <div className='header'>

            <div className='userName' style={{ width: '90%', marginTop: 10 }}>
                <EdiText
                value={name}
                type="text"
                onSave={handleNameSave}
                />
            </div>

            <div className='userWeight' style={{ width: '90%', marginTop: 10 }}>
                <EdiText
                value={weight}
                type="text"
                onSave={handleWeightSave}
                />
            </div>


        <h1>STATS</h1>

        </div>
    );
}

export default Header;