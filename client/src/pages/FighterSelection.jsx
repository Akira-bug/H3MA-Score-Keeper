// FighterSelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FighterSelection({ onSelectFighters }) {
  const [fighters, setFighters] = useState([]);
  const [selectedFighters, setSelectedFighters] = useState([]);
  const [isSelectionConfirmed, setIsSelectionConfirmed] = useState(false);

  useEffect(() => {
    // Fetch the list of fighters from the database
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/fencers');
        const data = response.data;
        setFighters(data);
      } catch (error) {
        console.error('Error fetching fighters:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSelection = (fighter) => {
    const isSelected = selectedFighters.includes(fighter);

    if (isSelected) {
      // Deselect the fighter
      setSelectedFighters((prevSelected) =>
        prevSelected.filter((selected) => selected !== fighter)
      );
    } else {
      // Select the fighter
      setSelectedFighters((prevSelected) => [...prevSelected, fighter]);
    }
  };

  const confirmSelection = () => {
    if (selectedFighters.length === 2) {
      onSelectFighters(selectedFighters);
      setIsSelectionConfirmed(true);
    } else {
      alert('Please select exactly 2 fighters.');
    }
  };

  return (
    <div>
      <h2>Fighter Selection</h2>
      <ul className='fighterList'>
        {fighters.map((fighter) => (
          <li
            key={fighter.id}
            onClick={() => toggleSelection(fighter)}
            className={selectedFighters.includes(fighter) ? 'selected' : ''}
          >
            {fighter.name} - {fighter.weapon}
          </li>
        ))}
      </ul>
      {!isSelectionConfirmed && (
        <button className="concludeButton" onClick={confirmSelection}>Confirm Selection</button>
      )}
    </div>
  );
}

export default FighterSelection;