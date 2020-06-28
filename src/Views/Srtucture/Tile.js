export default class Tile {
    constructor(id,posx,posy,gameField){
        this.id = id;
        this.isDestroyed = false;
        this.posx = posx;
        this.posy = posy;
        this.gameField = gameField;
    }

    getId (){
        return this.id;
    };
    getImage(){
        switch (this.id) {
            case 1:
                return 'blue';
            case 2:
                return 'purple';
            case 3:
                return 'red';
            case 4:
                return 'yellow';
        }
    };
    setId (id){
        if(id!==null&&id!==undefined){
            this.id = id;
        }
    }
    setDestroyed(bool){
        this.isDestroyed = bool;
    }
    getDestroyed(){
        return this.isDestroyed;
    }
    onClick(){
        throw new Error('Вы должны, нет, даже обязаны реализовать это в потомке');
    }
    getPosition(){
        return [this.posx,this.posy]
    }
    getPositionX(){
        return this.posx
    }
    getPositionY(){
        return this.posy;
    }
    setPosition(x,y){
        this.posx = x;
        this.posy = y;
    }
    checkSameTilesCount(){
        let _sameTilesCount = [];
        let _gameField = this.gameField.getGameFields();
        let _minCount = this.gameField.getMinCount();
        const  recursiveCheck =  (posX,posY,id,_gameField)=>{
            if(_sameTilesCount.find((tile)=>tile[0] === posY&&tile[1] === posX)&&_sameTilesCount.length!==1) return;
            _sameTilesCount.push( [posY,posX]);
            if(_gameField[posY+1] !== undefined && _gameField[posY+1][posX].getId() === id ) recursiveCheck(posX,posY+1,id,_gameField,posX,posY);
            if(_gameField[posY-1]!== undefined && _gameField[posY-1][posX].getId() === id) recursiveCheck(posX,posY-1,id,_gameField,posX,posY);
            if(_gameField[posY][posX+1] !== undefined && _gameField[posY][posX+1].getId() === id) recursiveCheck(posX+1,posY,id,_gameField,posX,posY);
            if(_gameField[posY][posX-1] !== undefined && _gameField[posY][posX-1].getId() === id) recursiveCheck(posX-1,posY,id,_gameField,posX,posY);
        };
        recursiveCheck(this.posx,this.posy,this.id,_gameField);
        if(_sameTilesCount.length >= _minCount) return  new Promise((resolve => {
            resolve(_sameTilesCount);
        }));
        if(_sameTilesCount.length <= _minCount) return new Promise((resolve => resolve(false)));
    };
}