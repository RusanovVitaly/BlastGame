
export default class Bonus {
    constructor(image,name,gameField){
        this.image = image;
        this.name = name;
        this.gameField = gameField;
    }

    getImage(){
        return this.image;
    }
    getName(){
        return this.name;
    }
    onClick(){
        throw new Error('Реализуйте сиё чудо в потомке, ну пажаласта')
    }

}