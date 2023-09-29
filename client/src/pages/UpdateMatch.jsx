import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateMatch = () => {
  const [match, setMatch] = useState({
    fighter1: '',
    fighter2: '',
    score1: 0,
    score2: 0,
    weapon1: '',
    weapon2: '',
    victor: '',
    doubles: 0,
    exchanges: 0,
    duration: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const matchId = location.pathname.split('/')[2];

  useEffect(() => {
    // Fetch the existing match data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://52.203.255.115:8080/matches/${matchId}`);
        const data = response.data;
        setMatch(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [matchId]);

  const handleChange = (e) => {
    setMatch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure you want to update these match details?');
    if (confirmation) {
      try {
        await axios.put(`http://52.203.255.115:8080/matches/${matchId}`, match);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const clickHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this match?');
    if (confirmation) {
      try {
        await axios.delete(`http://52.203.255.115:8080/matches/${matchId}`);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="form">
      <h1>Update Existing Match</h1>
      <input type="text" placeholder="Fighter 1" onChange={handleChange} name="fighter1" value={match.fighter1} />
      <input type="text" placeholder="Fighter 2" onChange={handleChange} name="fighter2" value={match.fighter2} />
      <input type="number" placeholder="Score 1" onChange={handleChange} name="score1" value={match.score1} />
      <input type="number" placeholder="Score 2" onChange={handleChange} name="score2" value={match.score2} />
      <input type="text" placeholder="Weapon 1" onChange={handleChange} name="weapon1" value={match.weapon1} />
      <input type="text" placeholder="Weapon 2" onChange={handleChange} name="weapon2" value={match.weapon2} />
      <input type="text" placeholder="Victor" onChange={handleChange} name="victor" value={match.victor} />
      <input type="number" placeholder="Doubles" onChange={handleChange} name="doubles" value={match.doubles} />
      <input type="number" placeholder="Exchanges" onChange={handleChange} name="exchanges" value={match.exchanges} />
      <input type="number" placeholder="Duration" onChange={handleChange} name="duration" value={match.duration} />

      <button className="formButton" onClick={handleClick}>
        Update
      </button>

      <button className="cancelButton" onClick={handleDelete}>
        Delete Match
      </button>

      <button className="cancelButton" onClick={clickHome}>
        Cancel
      </button>
    </div>
  );
};

export default UpdateMatch;
