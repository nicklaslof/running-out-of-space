import Level from "../level/level.js";
import Intro from "./intro.js";
import UI from "./ui.js";

class GameOverUI extends UI{

    constructor() {
        super();

        this.enterGameDelay = 1.5;
     
        
    }

    tick(game, deltaTime){
        this.enterGameDelay -= deltaTime;
        if (this.enterGameDelay < 0 && game.input.firePressed){
            game.level = new Level();
            game.intro = new Intro();
            game.showIntro = true;
            game.gameOver = false;
        } 
    }


    render(game){
        this.ctx.clearRect(0,0,W,H);


        this.drawTextAt("Game over!" ,380,220 ,"white",36);
        this.drawTextAt("Press to play again" ,320,320 ,"white",30);
       
    }

}

export default GameOverUI;