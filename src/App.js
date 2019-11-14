import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>Pick 1 or more number numbers that sum up to the number of stars</h3>
      <div className="stars-container"></div>
      <div className="key-pad">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
      </div>
    </div>
  );
}

export default App;
