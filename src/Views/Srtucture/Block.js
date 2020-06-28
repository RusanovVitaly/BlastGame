import Tile from './Tile'

export default class Block extends Tile{
    constructor(id,posx,posy,gameField){
        super(id,posx,posy,gameField);
        this.id = id;
        this.image = this.getImage();
        this.posx = posx;
        this.posy = posy;
        this.gameField = gameField;
    }
    async checkSameTilesCount(){
        const _gameFields = this.gameField.getGameFields();
        const _count = this.gameField.getMinCount();
        const {posx,posy,id}=this;
        return await super.checkSameTilesCount(posx,posy,id,_count,_gameFields)
    };
    onClick() {
        const _gameFields = this.gameField.getGameFields();
        this.checkSameTilesCount()
            .then(sameTilesCount=>{
                if(sameTilesCount !== false){
                    this.gameField.decreaseSteps();

                    return  this.gameField.destructTiles(sameTilesCount,_gameFields);
                }
                else {
                    return false;
                }
            })
            .then( (gameField)=>{
                if(gameField!== false){
                    setTimeout(()=>{
                        this.gameField.setTilesPhysics(gameField);
                        this.gameField.fillTiles(_gameFields);
                    },300);
                    return _gameFields
                }
            });
    }
}