import Bomb from "../entity/bomb.js";
import BulletPickup from "../entity/bulletpickup.js";
import Chest from "../entity/chest.js";
import Enemy from "../entity/enemy.js";
import Heart from "../entity/heart.js";
import Worm from "../entity/worm.js";
import Arrow from "./arrow.js";
import UI from "./ui.js";

class Intro extends UI{

    constructor() {
        super();


        this.introInstructionsY = 300;

        this.arrows = [];

        this.arrows.push(new Arrow(202,this.introInstructionsY+2));
        this.arrows.push(new Arrow(202,this.introInstructionsY+50));
        this.arrows.push(new Arrow(202,this.introInstructionsY+96));

        this.enemy = new Enemy(260,this.introInstructionsY );
        this.worm = new Worm(320,this.introInstructionsY );

        this.bullet = new BulletPickup(256, this.introInstructionsY+44);
        this.heart = new Heart(284, this.introInstructionsY+44);

        this.bomb = new Bomb(256, this.introInstructionsY+88,null,24,32);
        this.chest = new Chest(294, this.introInstructionsY+90);
        
    }

    tick(game, deltaTime){
        this.arrows.forEach(arrow => {
            arrow.tick(game,deltaTime);
        });
        this.enemy.tick(game,deltaTime);
        this.worm.tick(game,deltaTime);
        this.heart.tick(game,deltaTime);
        this.bomb.tick(game,deltaTime);
        this.chest.tick(game,deltaTime);
    }


    render(game){
        this.ctx.clearRect(0,0,W,H);
        this.drawTextAt("Kill these" ,50,this.introInstructionsY ,"white",18);


        this.drawTextAt("Pickup these" ,50,this.introInstructionsY+48,"white",18);

        this.drawTextAt("Shoot these" ,50,this.introInstructionsY+94,"white",18);

        this.drawTextAt("Watch out for poisonous areas!" ,50,this.introInstructionsY+158 ,"white",18);
        this.drawTextAt("And don't run out of space (or bullets)" ,50,this.introInstructionsY+198 ,"white",18);

        this.enemy.render(game);
        this.worm.render(game);
        this.bullet.render(game);
        this.heart.render(game);
        this.bomb.render(game);
        this.chest.render(game);
        

        //this.drawTextAt("Bullets: "+game.level.player.bullets,170,20,"white",18);


        this.arrows.forEach(arrow => {
            arrow.render(this,game);
        });
    }

}

export default Intro;