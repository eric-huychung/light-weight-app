import React, { useState, useEffect } from 'react'
//import PlusButton from '../buttons/PlusButton'
import './stats.scss'
import EdiText from 'react-editext';

function Stats() {

    const [newItem, setNewItem] = useState("");
    const [items, setItems] = useState([]);

    // Load the items from localStorage when the component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save the items to localStorage whenever the 'items' state changes
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);


    function addItem() {
        if (!newItem) {
            alert("Type Something!");
            return;
        }
        const item = {
            id: Math.floor(Math.random() * 1000),
            value: newItem,
            outputWeight: 'Edit Your Weight',
        }
        setItems(oldList => [...oldList, item]);
        setNewItem("");
    }

    function deleteItem(id) {
        const newArray = items.filter(item => item.id !== id);
        setItems(newArray);
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        //console.log("Yas");
        addItem();
      }
    }


    const handleSave = (value, itemId) => {
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === itemId ? { ...item, outputWeight: value } : item))
        );
      };

    return (
        <div className='stats'>   
            <div className='statsInput'>
                <input
                    type="text"
                    placeholder="Add Your Lift..." 
                    value ={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={handleKeypress}
                />
                <button className="btn btn-primary" onClick={() => addItem()}>Enter</button>
            </div>
            
            

            <ul>
                {items.map(item => {
                    return (
                        <li key={item.id}>
                            <div className='statsOutput'>
                                <div className='outputName'>
                                    {item.value} 
                                </div>
                                <button onClick={() => deleteItem(item.id)}>X</button>
                            </div>
                            
                            <div className='outputWeight' style={{ width: '90%', marginTop: 10 }}>
                                <EdiText
                                value={item.outputWeight}
                                type="text"
                                onSave={(value) => handleSave(value, item.id)}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Stats;