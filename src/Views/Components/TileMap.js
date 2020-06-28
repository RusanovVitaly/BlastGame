import React from 'react';
import Tile from "./Tile";

export default ({gameFields})=>(
    <div className='wrapper' >
        {gameFields.map((row,RowKey) => (
            <div key={RowKey} className={'row'} style={{display:'flex'}} >
                {row.map((column,key) => (
                    <Tile tile = {column} ColumnKey={key} key={key}  isDestroyed={column.getDestroyed()} RowKey={RowKey} />
                ))}
            </div>
        ))}
    </div>
)