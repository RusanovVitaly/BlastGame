import React from 'react';

export default ({activeBonuses})=>(
    <div className={'bonus-wrapper'} >
        {activeBonuses!==[]?activeBonuses.map((bonus,key)=>(
            <div key={key} className='bonus' onClick={()=>{bonus.onClick();}}>
                <div className='bonus_image'>
                    <img src={bonus.getImage()} alt=""/>
                </div>
                <div className='bonus_name'>
                    <p>{bonus.getName()}</p>
                </div>
            </div>
        )):''}
    </div>
)