import React from 'react';

function PlayButton({ buttonId, status, backgroundColor, onClick }) {
  return (
    <button
      className="star"
      onClick={() => onClick(buttonId, status)}
      style={{ backgroundColor: backgroundColor }}
    >
      {buttonId}
    </button>
  );
}

export default PlayButton;
