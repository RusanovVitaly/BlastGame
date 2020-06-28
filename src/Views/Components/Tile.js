import React from 'react';

export default ({tile,ColumnKey,isDestroyed})=>(
    <div  onClick={()=>tile.onClick()} key={ColumnKey} style={{ width: '115px',height:'130px'}} className={`tile tile-image  `}>
        <div style={{width:'100%',height:'100%',backgroundSize:'contain'}} className={`${tile.getImage()} ${isDestroyed?'destroy':''}`}/>
    </div>
)