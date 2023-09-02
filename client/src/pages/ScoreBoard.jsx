import React, { useState, useEffect } from "react";
import axios from 'axios';

function Scoreboard() {
        
    const [fencers, setFencers] = useState([]);

    // Function to fetch data from the database
    const fetchData = async () => {
        try {
            // Make an Axios GET request to fetch fencers' data from the database
            const response = await axios.get("http://192.168.56.11:8080/fencers");
            const data = response.data;
            
            // Sort the data by score in descending order
            data.sort((a, b) => b.score - a.score);

            // Add a rank property to each fencer
            data.forEach((fencer, index) => {
                fencer.rank = index + 1;
            });

            // Update the state with the fetched data
            setFencers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
          <h1>Scoreboard</h1>
          <hr/>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {fencers.map((fencer) => (
                <tr key={fencer.id}>
                  <td>{fencer.rank}</td>
                  <td>{fencer.name}</td>
                  <td>{fencer.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

export default Scoreboard;