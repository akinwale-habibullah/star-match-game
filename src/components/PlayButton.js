import React from 'react';

function PlayButton({ buttonId, colors, status, backgroundColor }) {
  return (
    <button
      className="star"
      onClick={() => console.log('Num', buttonId)}
      style={{ backgroundColor: backgroundColor }}
    >
      {buttonId}
    </button>
  );
}

export default PlayButton;
