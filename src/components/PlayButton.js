import React from 'react';

function PlayButton({range}) {
  return <>
    {
      range.map(buttonId => 
        <button key={buttonId} 
          className="star" 
          onClick={() => console.log('Num', buttonId)}>
            {buttonId}
        </button>
      )
    }
  </>
}

export default PlayButton;
