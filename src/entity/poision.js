import CollisionEntity from "./collisionentity.js";

class Poision extends CollisionEntity{
    constructor(posX, posY,hasLight) {
        super(posX,posY,0,0,0,0,0xffffffff,0,0,"po");
        this.setCustomCollisionSize(200,200);
        this.hasLight = hasLight;
        this.lightSize = 250;
        this.lightColor = 0xff00ff00;
        this.lightOffsetX = 8;
        this.hitTimeout = 0.2;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
    }

    render(game){

    }
    collidedWith(game, otherEntity){
        if (otherEntity.type == "p"){
            otherEntity.hit(game,1);
        }
    }
    
}

export default Poision;