import React from 'react';


export default class StatusBar extends React.Component{
    state={
        p:'text'
    };
    render() {
        return(
            <div>{this.state.p}</div>
        )
    }
}