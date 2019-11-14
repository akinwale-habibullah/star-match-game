import React from 'react';

function Star({range}) {
  return <>
    {
      range.map(starId => 
        <div key={starId} className="star"/>
      )
    }
  </>
}

export default Star;
