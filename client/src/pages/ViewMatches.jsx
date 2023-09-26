import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

function ViewMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch the list of matches from the database
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.56.11:8080/matches');
        const data = response.data;
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchData();
  }, []);

    // Function to trigger backup/restore
    const performBackupRestore = async () => {
        try {
            const response = await axios.post('http://192.168.56.11:8080/backup')
            // Handle success, e.g., display a success message to the user
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div>
      <h2>Match List</h2>
      <table>
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Fighter 1</th>
            <th>Fighter 2</th>
            <th>Score 1</th>
            <th>Score 2</th>
            <th>Weapon 1</th>
            <th>Weapon 2</th>
            <th>Victor</th>
            <th>Doubles</th>
            <th>Exchanges</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.fighter1}</td>
              <td>{match.fighter2}</td>
              <td>{match.score1}</td>
              <td>{match.score2}</td>
              <td>{match.weapon1}</td>
              <td>{match.weapon2}</td>
              <td>{match.victor}</td>
              <td>{match.doubles}</td>
              <td>{match.exchanges}</td>
              <td>{match.duration}</td>
              <td>
                <Link to={`/updatematch/${match.id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='concludeButton' onClick={performBackupRestore}>Backup data</button>
    </div>
  );
}

export default ViewMatches;
