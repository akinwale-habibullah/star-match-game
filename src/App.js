import React, { useState, useEffect } from 'react';
import './App.css';
import PlayButton from './components/PlayButton';
import PlayAgain from './components/PlayAgain';
import Star from './components/Star';

function StarMatch({startNewGame}) {
  const utils = {
    // sum an array
    sum: arr => arr.reduce((acc, curr) => (acc += curr), 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) =>
      Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    }
  };

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1,9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
  useEffect(() => {
    if (secondsLeft  > 0 && gameStatus === 'active') {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0
    ? 'won' : secondsLeft === 0 
    ? 'lost'
    : 'active'

  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue'
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || gameStatus !== 'active') {
      return;
    }

    // candidateNums
    const newCandidateNums = currentStatus === 'available'
        ? [...candidateNums, number]
        : candidateNums.filter(cn => cn !== number)
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter((item) => {
        return !newCandidateNums.includes(item)
      });
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }

  return (
    <div className="App">
      <h3>Pick 1 or more number numbers that sum up to the number of stars</h3>
      <div className="stars-container">
        {
          gameStatus !== 'active' ? (
              <PlayAgain onClick={startNewGame} gameStatus={gameStatus}/>
          ) : (
            <Star range={utils.range(1, stars)} />
          )
        }
      </div>

      <div className="key-pad">
        {utils.range(1, 9).map(buttonId => (
          <PlayButton
            key={buttonId}
            buttonId={buttonId}
            status={numberStatus(buttonId)}
            backgroundColor={colors[numberStatus(buttonId)]}
            onClick={onNumberClick}
          />
        ))}
      </div>

      <div className="timer">
        <p><b>Time Remaining:</b> <em>{secondsLeft}</em></p>
      </div>
    </div>
  );
}

function App(){
  const [gameId, setGameId] = useState(1);
  return <StarMatch key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
}


export default App;
