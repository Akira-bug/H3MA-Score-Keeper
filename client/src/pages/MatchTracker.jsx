import React, { useState, useEffect } from 'react';
import FighterSelection from './FighterSelection';

function MatchTracker() {

    //State to manage fighters
    const [fighter1, setFighter1] = useState(null);
    const [fighter2, setFighter2] = useState(null);
    const [isFighterSelectionOpen, setIsFighterSelectionOpen] = useState(false);

    //State to manage the score
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [doublesHits, setDoubleHits] = useState(0);
    const [exchangeNum, setExchangeNum] = useState(0);

    // State to manage the timer
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };

    }, [isRunning]);

    // Function to start/stop the timer
    const toggleTimer = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

      // Function to format the timer as minutes and seconds
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Function to reset the timer
    const resetTimer = () => {
        setTimer(0);
        setIsRunning(false);
    };

    const handleSelectFighters = (selectedFighters) => {
        if (selectedFighters.length === 2) {
        setFighter1(selectedFighters[0]);
        setFighter2(selectedFighters[1]);
        }
        setIsFighterSelectionOpen(false);
    };

    // Function to update scores
    const increaseScore = (fighter) => {
        if (fighter === fighter1) {
        setScore1((prevScore) => prevScore + 1);
        } else if (fighter === fighter2) {
        setScore2((prevScore) => prevScore + 1);
        }
    };

    // Function to update scores
    const decreaseScore = (fighter) => {
        if (fighter === fighter1) {
        setScore1((prevScore) => prevScore - 1);
        } else if (fighter === fighter2) {
        setScore2((prevScore) => prevScore - 1);
        }
    };

    const iDouble = () => {
        setDoubleHits((prevDoubles) => prevDoubles +1);
    }

    const dDouble = () => {
        setDoubleHits((prevDoubles) => prevDoubles -1);
    }

    const iExchange = () => {
        setExchangeNum((prevEx) => prevEx +1);
    }

    const dExchange = () => {
        setExchangeNum((prevEx) => prevEx -1);
    }


      // Function to confirm match cancellation
  const cancelMatch = () => {
    const confirmation = window.confirm('Are you sure you want to cancel the match?');
    if (confirmation) {
      // Perform the cancellation action
      setFighter1(null);
      setFighter2(null);
    }
  };

  // Function to confirm match conclusion
  const concludeMatch = () => {
    const confirmation = window.confirm('Are you sure you want to conclude the match?\nConcluding the match will result in the match data being sent to the database.');
    if (confirmation) {
      // Perform the conclusion action
      // You can add logic here to save match results or take other actions
      // For now, let's reset the selected fighters and timer
      setFighter1(null);
      setFighter2(null);
      setScore1(0)
      setScore2(0)
      setTimer(0);
      setIsRunning(false);
    }
  };



    // Render the match tracker UI
    return (
        <div>
            <h2>Match Tracker</h2>
            <hr />
            {/* ----------- SELECTION --------- */}
            <div className='matchOptions'>
                {!fighter1 && !fighter2 ? (
                <button className="concludeButton" onClick={() => setIsFighterSelectionOpen(true)}>
                    Select Fighters
                </button>
                ) : (
                <div>
                    <p>Fighter A: {fighter1 && fighter1.name}</p>
                    <p>Fighter B: {fighter2 && fighter2.name}</p>
                </div>
                )}
            </div>
                
            {isFighterSelectionOpen && (
            <FighterSelection onSelectFighters={handleSelectFighters} />
            )}
            <hr />
            
            {/* ----------- SCORING --------- */}
            <hr />
            <div className='scores'>
                <div className='score blue'>
                    <p className='number'>{score1}</p>
                    <p className='names'>{fighter1 && fighter1.name}</p> 
                </div>

                <div className='score red'>
                    <p className='number'>{score2}</p>
                    <p className='names'>{fighter2 && fighter2.name}</p> 
                </div>
                
            </div>
            <div className='scores'>
                <button className='blue scoreButton' onClick={() => increaseScore(fighter1)}>+1</button>
                <button className='blue scoreButton' onClick={() => decreaseScore(fighter1)}>-1</button>
                <button className='red scoreButton' onClick={() => increaseScore(fighter2)}>+1</button>
                <button className='red scoreButton' onClick={() => decreaseScore(fighter2)}>-1</button>
            </div>

            {/* ----------- TIMER --------- */}
            <div className='theTimer'>
                <p>{formatTime(timer)}</p>    
            </div>
            <div className='matchOptions' timer>
                <button className='timerButton' onClick={toggleTimer}>
                {isRunning ? 'Stop Timer' : 'Start Timer'}
                </button>
                <button className='cancelButton' onClick={resetTimer}>Reset Timer</button>
            </div>
            <div className='matchOptions info'>
                <p>|&emsp;Exchange:   {exchangeNum}&emsp;|</p>
                <p>|&emsp;Doubles:   {doublesHits}&emsp;|</p>
            </div>
            <div className='matchOptions'>
                <button className='concludeButton' onClick={() => iExchange()}>+1 Exchange</button>
                <button className='concludeButton' onClick={() => dExchange()}>-1 Exchange</button>
                <button className='concludeButton' onClick={() => iDouble()}>+1 Double</button>
                <button className='concludeButton' onClick={() => dDouble()}>-1 Double</button>
            </div>

            <hr />
            <div className='matchOptions'>
                
                <button className='concludeButton' onClick={concludeMatch}>Conclude Match</button>
                <button className='cancelButton' onClick={cancelMatch}>Cancel Match</button>
            </div>
        </div>
    );
}

export default MatchTracker;
