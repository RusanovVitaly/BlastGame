import React from 'react';

export default ({points,moves})=>(
    <div className='side-bar'>
        <div className='side-bar_moves'>
            <p>{moves}</p>
        </div>
        <div className='side-bar_points'>
            <p>Очки:{points}</p>
        </div>
    </div>
)