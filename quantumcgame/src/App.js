import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Electron from './Electron';
import { FaBolt } from 'react-icons/fa';


function App() {
  const title = "Quantum Guessig Game"
  const [coins, setCoins] = useState(10);
  const [result, setResult] = useState([]);
  const [guess, setGuess] = useState('');
  const [playedcoins, setPlaycoins] = useState(0);
  const [zero_prob, SetZero] = useState(Math.random()) 
  const [measurement, SetMeasurement] = useState([])
  const psi = '\u03C8';
  const alpha = '\u03B1';
  const beta = '\u03B1';
  const auxiliar_played = 0;

 

  const message = "Welcome to our quantum game!\n"
  const mess_2 = "Get ready to play with the principles of quantum mechanics. In this game, you will be presented with a qubit in a quantum state, described as a superposition of the two basis states |0> and |1>.\n" 
  const mess_4 = "What is a qubit and what is superposition you may be asking. In classical computing the basic unit is the bit, which can be either a 0 or a 1. In quantum computing the basic unit is the qubit. The main difference is that a qubit can be a 0, a 1 or both at the same time! In the latter case, we will say that the qubit is in superposition."
  const mess_5 = "When a qubit is in super position we have that a qubit |a> = b|0> + c|1> where |b|^2 is the probability of measuring a 0 while |c|^2 is the probability of measuring a |1>."
  const mess_3 = "Your goal is to guess the probability of measuring the qubit in the state |0> given a certain number of measurements. Each round of the game, the qubit will take a state with random probabilities. You will make a guess and if you are close to the real probability value, you will earn a coin. Otherwise, you will lose 3 coins. Remember, the measurements represent the actual probability of measuring |0>.\n This game is a fun and interactive way to explore and understand the principle of superposition and the behavior of quantum systems. So let's start playing and see how well you can guess the probability of the state |0> of a qubit!";

  const handleMeasureClick = () => {

    if(result.length>=10){
      return;
    }
    // Generate a random 0 or 1
    if (Math.random() < zero_prob) {
      SetMeasurement(0);
    } else {
      SetMeasurement(1);
    }

    // Add the result to the list of results
    setResult((prevResults) => [...prevResults, measurement]);
  };
  const handlePlayingCoins = () => {
    if(result.length >0){
      return;
    }
    if (coins - auxiliar_played < 1) {
      return;
    }
    // Add the result to the list of results
    setPlaycoins((playedcoins) => [playedcoins]);
    setCoins((coins) => [coins-playedcoins]);
  };


  const handleGuessSubmit = (event) => {
    event.preventDefault();
    const guessValue = parseFloat(guess);
    
    if (isNaN(guessValue) || guessValue < 0 || guessValue > 1) {
      alert('Please enter a valid probability guess between 0 and 1.');
      return;
    }
    const correctGuess = zero_prob

    if (Math.abs(guessValue - correctGuess) < 0.1) {
      if(result.length == 10)
        setCoins((prevCoins) => (parseFloat(prevCoins)+ playedcoins*1.03));
      if(result.length == 9)
        setCoins((prevCoins) => (parseFloat(prevCoins) + playedcoins*1.04));
      if(result.length == 8)
        setCoins((prevCoins) => (parseFloat(prevCoins)+ playedcoins*1.06));
      if(result.length == 7)
        setCoins((prevCoins) => (parseFloat(prevCoins) + playedcoins*1.1));
      if(result.length == 6)
        setCoins((prevCoins) => (parseFloat(prevCoins) + playedcoins*1.2));
      if(result.length == 5)
        setCoins((prevCoins) => (parseFloat(prevCoins)+ playedcoins*1.3));
      if(result.length == 4)
        setCoins((prevCoins) => (parseFloat(prevCoins)+ playedcoins*1.4));
      if(result.length == 3)
        setCoins((prevCoins) => (parseFloat(prevCoins)+ playedcoins*1.5));
      if(result.length == 2)
        setCoins((prevCoins) => (parseFloat(prevCoins) + playedcoins*(1.6)));
      if(result.length == 1)
        setCoins((prevCoins) => (parseFloat(prevCoins)+ playedcoins*(1.7)));
      if(result.length == 0)
        setCoins((prevCoins) => (parseFloat(prevCoins) + playedcoins*2));

    } else {
      setCoins((prevCoins) => (parseFloat(prevCoins) - playedcoins));
    }

    setResult([]);
    setPlaycoins(0);
    SetZero(Math.random());
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1>Quantum Guessing Game</h1>
      </div>

      <div className="electron">
        <FaBolt size="2em" color="#FFD700" />
      </div>
      <div className="coin-container">
        <span className="coin-count">Coins: {coins}</span>
        <div>
          <FontAwesomeIcon icon={faCoins} size="lg" color="#FFD700" />
        </div>
      </div>
      <div className="played-coin-container">
        <span className="played-coin-count">Playing Coins: {playedcoins}</span>
        <div>
          <FontAwesomeIcon icon={faCoins} size="lg" color="#FFD700" />
        </div>
      </div>
      
      <p>{message}</p>
      <p>{mess_2}</p>
      <p>{mess_4}</p>
      <p>{mess_5}</p>
      <p>{mess_3}</p>
      <div className="played-coins-container">
          <label htmlFor="played-coins-input">
          </label>
          <input
            id="played-coins-input"
            type="number"
            step="0.01"
            min="0"
            max={coins}
            value={playedcoins}
            onChange={(event) => setPlaycoins(event.target.value)}
          />
          <button className="played-coins-button"onClick={handlePlayingCoins}>Play</button>
      </div>

      <button className="measure-button" onClick={handleMeasureClick}>Measure</button>
      <div className="measurement-container">
        {result.map((measurement, index) => (
          <div key={index} className="measurement-item">
            Measurement {index + 1}: {result}
          </div>
        ))}
      </div>
      <div className="guess-container">
        <form onSubmit={handleGuessSubmit}>
          <label htmlFor="guess-input">

          </label>
          <input
            id="guess-input"
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
          />
          <button className="guess-button" type="submit">Submit Guess</button>
        </form>
      </div>
    </div>
  );
}

export default App;
