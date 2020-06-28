import Bonus from "./Bonus";

export default class ShakeBonus extends Bonus{
    constructor(image,name,gameField){
        super(image,name,gameField);
        this.name = name;
        this.gameField = gameField;
    }
    onClick() {
        this.gameField.shuffleFieldBooster();
    }
}