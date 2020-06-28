import React from 'react';
import '../../App.css';
import TileMap from "../Components/TileMap";
import StatusBar from '../Components/StatusBar';
import Block from '../Srtucture/Block';
import SideBar from '../Components/SideBar';
import BonusField from '../Components/BonusField';
import ShakeBonus from '../Srtucture/ShakeBonus';


export default class Field extends React.Component {
    constructor(){
        super();
        this.field = this;
        this.state = {
            gameFields : [],
            count:2,
            stepsLeft:25,
            pointsNeed:350,
            points:0,
            maxMixingCount:5,
            currentMixed:0,
            playgroundX:5,
            playGroundY:5,
            showOverlay:false,
            overlayMessage:'',
            activeBonuses:[new ShakeBonus("/images/buttons/shakeit.png","ShakeIt",this.field)]
        };
    }

    getGameFields = ()=>{
      return this.state.gameFields;
    };
    getMinCount = ()=>{
        return this.state.count;
    };
    checkSteps = (gameField,count,maxMixingCount,currentMixed)=>{
            let _checkingArray = [];
            for (let i = 0;i<gameField.length;i++){
                for (let j = 0;j<gameField[i].length;j++){
                    gameField[i][j].checkSameTilesCount()
                        .then(res=>{
                            if(res!==false){
                                _checkingArray.push(res);
                            }
                        })
                        .then(()=>{
                            if(_checkingArray.length === 0){
                                if(currentMixed<maxMixingCount){
                                    let gameFields = this.shuffleField(gameField);
                                    this.fillPlayground(this.state.playgroundX,this.state.playGroundY);
                                    this.setState({currentMixed:currentMixed+1,gameFields})
                                }
                                else this.gameFailed();
                            }
                        })
                }
            }

    };
    shuffleFieldBooster = ()=>{
        this.setState({gameFields:this.shuffleField()})
    };
    shuffleField = () =>{
        const gameFields = this.state.gameFields;
        let sortedRow = gameFields.sort(()=>Math.random()-0.5);
        for (let i = 0;i<sortedRow.length;i++) {
                let sorted = sortedRow[i].sort(()=>Math.random()-0.5);
                for (let j = 0;j<sorted.length;j++){
                    sortedRow[i][j].setPosition(j,i);
                }
        }
        return gameFields;
    };
    gameFailed = ()=>{
        console.log("SOWWY(ПЕЧААААЛЬКА):(");
        this.setState({showOverlay:true,overlayMessage:'К сожалению - вы проиграли!'})
    };
    winGame = ()=>{
        this.setState({showOverlay:true,overlayMessage:'Поздравляю, вы выиграли!'})
    };
    decreaseSteps = () =>{
        const {stepsLeft,points,pointsNeed} = this.state;
        this.setState({stepsLeft:stepsLeft-1},()=>{
            if(stepsLeft === 1 && points<pointsNeed){
                this.gameFailed();
            }
            if(points>=pointsNeed){
                this.winGame();
            }
        })
    };
    increasePoints = (destroyedTiles)=>{
      let points = (destroyedTiles.length * destroyedTiles.length) + this.state.points;
      this.setState({points},()=>console.log(points));

    };
    componentDidMount=()=> {
        this.fillPlayground();
    };
    fillPlayground = ()=>{
        const x = this.state.playgroundX;
        const y = this.state.playGroundY;
        let gameFields = [];
        for (let i = 0;i<y;i++){
            let xarr = [];
            for(let j = 0;j<x;j++){
                let id = Math.floor(Math.random() * Math.floor(4)+1);
                xarr.push(new Block(id,j,i,this.field));
            }
            gameFields.push(xarr);
        }
        this.setState({gameFields});
    };
    fillTiles = (gameFields)=>{
        for (let i = 0;i<gameFields.length;i++){
            for (let j = 0;j<gameFields[i].length;j++){
                if(gameFields[i][j].getId() === 0){
                    gameFields[i][j].setId(Math.floor(Math.random() * Math.floor(4)+1));
                }
            }
        }
        this.setState({gameFields},()=>{
            this.checkSteps(this.state.gameFields,this.state.count,this.state.maxMixingCount,this.state.currentMixed);
        })
    };
    setTilesPhysics = (tiles)=>{
        let _iterationsCount = 0;
        const iterate = (tiles)=>{
            for (let i = 0;i<tiles.length;i++){
                for (let j = 0;j<tiles[i].length;j++){
                    if(tiles[i][j].getId() === 0){
                        if(tiles[i-1] !== undefined && tiles[i-1][j].getId() !== 0){
                            tiles[i][j].setId(tiles[i-1][j].getId());
                            tiles[i-1][j].setId(0);
                            _iterationsCount++;
                        }
                    }
                }
            }
            if(_iterationsCount === 0){
                this.setState({gameFields:tiles});
            }
            else {
                _iterationsCount=0;
                iterate(tiles);
            }
        };
        iterate(tiles);
    };
    destructTiles = (tiles,gameFields) =>{
        this.increasePoints(tiles);
        tiles.map(tile=>{
            gameFields[tile[0]][tile[1]].setId(0);
            gameFields[tile[0]][tile[1]].setDestroyed(true);
        });
        this.setState({gameFields});
        return gameFields;
    };
    render() {
        const {gameFields,stepsLeft,points,showOverlay,overlayMessage,activeBonuses} = this.state;
        return(
            <div className='container'>
                <div style={showOverlay?{display:'block'}:{display:'none'}} className='overlay-wrapper'>
                <div  className='overlay'>
                    <h1>{overlayMessage}</h1>
                    <button className='button-red' onClick={()=>{window.location.reload()}}>Начать заново</button>
                </div>
                </div>
                <div className='status-bar'>
                    <StatusBar/>
                </div>
                <div style={{display:'flex',width:'70%',margin:'0 auto'}}>
                    <TileMap gameFields={gameFields}/>
                    <div>
                        <SideBar moves={stepsLeft} points={points}/>
                        <BonusField activeBonuses={activeBonuses}/>
                    </div>
                </div>
            </div>
        )
    }
}
