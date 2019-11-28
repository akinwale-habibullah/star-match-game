import React from 'react';

const PlayAgain = ({onClick, gameStatus}) => {
  return <div className='game-done'>
    <p style={{color: gameStatus === 'lost' ? 'red' : 'green'}}>
      <b>
        {
          gameStatus === 'lost'
          ? 'Game Over'
          : 'You won!'
        }
      </b>
    </p>

    <button 
      onClick={() => onClick()}>
        Play Again!
    </button>
  </div>
  
}

export default PlayAgain;
