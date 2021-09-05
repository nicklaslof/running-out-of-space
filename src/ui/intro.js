import Bomb from "../entity/bomb.js";
import BulletCollector from "../entity/bulletcollector.js";
import BulletPickup from "../entity/bulletpickup.js";
import Chest from "../entity/chest.js";
import Enemy from "../entity/enemy.js";
import Heart from "../entity/heart.js";
import WeaponStrengthPickup from "../entity/weaponstrengthpickup.js";
import Worm from "../entity/worm.js";
import Level from "../level/level.js";
import Arrow from "./arrow.js";
import UI from "./ui.js";

class Intro extends UI{

    constructor() {
        super();

        this.enterGameDelay = 1.5;
        this.introInstructionsY = 300;

        this.arrows = [];
        this.entites = [];

        this.arrows.push(new Arrow(502,this.introInstructionsY+2));
        this.arrows.push(new Arrow(502,this.introInstructionsY+50));
        this.arrows.push(new Arrow(502,this.introInstructionsY+96));

        this.entites.push(new Enemy(560,this.introInstructionsY));
        this.entites.push(new Worm(620,this.introInstructionsY));

        this.entites.push(new BulletPickup(556, this.introInstructionsY+44));
        this.entites.push(new Heart(580, this.introInstructionsY+44));
        this.entites.push(new WeaponStrengthPickup(604, this.introInstructionsY+44,null,19,11));
        this.entites.push(new BulletCollector(634, this.introInstructionsY+44));

        this.entites.push(new Bomb(556, this.introInstructionsY+88,null,24,32));
        this.entites.push(new Chest(620, this.introInstructionsY+90));
        
    }

    tick(game, deltaTime){
        this.arrows.forEach(arrow => {
            arrow.tick(game,deltaTime);
        });

        this.entites.forEach(e => {
            e.tick(game,deltaTime);
        });

        this.enterGameDelay -= deltaTime;
        if (this.enterGameDelay < 0 && game.input.firePressed){
            this.entites.forEach(e => {
                e.disposed = true;
                game.level = new Level();
            });
            game.showIntro = false;
        } 
    }


    render(game){
        this.ctx.clearRect(0,0,W,H);


        this.drawTextAt("Don't run out of space!" ,240,60 ,"white",36);
        this.drawTextAt("A game for JS13k 2021 by Nicklas Löf" ,270,100 ,"white",20);
        this.drawTextAt("Graphics by Orangepascal from http://orangepixel.net" ,180,150 ,"white",20);
        this.drawTextAt("and additonal graphics by Nicklas Löf" ,264,180 ,"white",20);

        this.drawTextAt("WASD and SPACE or use a gamepad" ,320,this.introInstructionsY-50 ,"white",18);

        this.drawTextAt("Kill these" ,350,this.introInstructionsY ,"white",18);


        this.drawTextAt("Pickup these" ,350,this.introInstructionsY+48,"white",18);

        this.drawTextAt("Shoot these" ,350,this.introInstructionsY+94,"white",18);

        this.drawTextAt("Watch out for poisonous areas!" ,340,this.introInstructionsY+158 ,"white",18);
        this.drawTextAt("And don't run out of space (or bullets)" ,290,this.introInstructionsY+198 ,"white",18);

        this.drawTextAt("Press SPACE or your gamepad to start" ,304,this.introInstructionsY+240 ,"white",18);

        this.entites.forEach(e => {
            e.render(game);
        });
        

        //this.drawTextAt("Bullets: "+game.level.player.bullets,170,20,"white",18);


        this.arrows.forEach(arrow => {
            arrow.render(this,game);
        });
    }

}

export default Intro;