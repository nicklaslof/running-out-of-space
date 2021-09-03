import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";

class Poision extends CollisionEntity{
    constructor(posX, posY,hasLight) {
        super(posX,posY,0,0,0,0,0xffffffff,0,0,"po");
        this.setCustomCollisionSize(200,200);
        this.hasLight = hasLight;
        this.lightSize = 250;
        this.lightColor = 0xffff66fe;
        this.lightOffsetX = 8;
        this.hitTimeout = 0.2;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (this.getRandom(0,100)<1) game.level.addEntity(new Particle(this.position.x+this.getRandom(-25,25), this.position.y+this.getRandom(-25,25), {x: this.getRandom(-28,29),y: 1},0xffff66fe,2,false,4));
    }

    render(game){

    }
    collidedWith(game, otherEntity){
        if (otherEntity.type == "p"){
            otherEntity.hit(game,1,{x:Math.random(-1,1), y: Math.random(-1,1)});
        }
    }
    
}

export default Poision;