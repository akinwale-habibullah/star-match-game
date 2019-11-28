import React from 'react';

const PlayAgain = ({onClick}) => {
  return <button 
    className='game-done'
    onClick={() => onClick()}>
    Play Again!
    </button>
}

export default PlayAgain;
