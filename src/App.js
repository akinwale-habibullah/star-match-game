import React, { useState } from 'react';
import './App.css';
import PlayButton from './components/PlayButton';
import Star from './components/Star';

function App() {
  const utils = {
    // sum an array
    sum: arr => arr.reduce((acc, curr) => acc += curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

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
  }
  
  const [stars, setStars] = useState(utils.random(1,9), );

  const colors = {
    available: "red",
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

  return (
    <div className="App">
      <h3>Pick 1 or more number numbers that sum up to the number of stars</h3>
      <div className="stars-container">
        <Star range={utils.range(1, stars)} />
      </div>
      <div className="key-pad">
        {
          utils.range(1, 9).map(buttonId => 
            <PlayButton key={buttonId} buttonId={buttonId}/>
          )
        }
      </div>
    </div>
  );
}

export default App;
