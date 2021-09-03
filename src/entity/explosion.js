import Entity from "./entity.js";
import Animation from "./animation.js";
class Explosion extends Entity{
    constructor(posX,posY) {
        super(posX,posY,16,32,16,16,0xffffffff,64,64,"e");
        this.position.z = -1;
        this.ttl = 0.5;
       
        this.hasLight = true;
        this.lightColor = 0xff00ffff;
        this.lightSize = 200;
        this.lightOffsetX = 10;
        this.lightOffsetY = 8;
    

        this.animation = new Animation();
        this.animation.addState("explosion",16,32,16,16,0.1).addState("explosion",32,32,16,16,0.1)
        .addState("explosion",48,32,16,16,0.1).addState("explosion",64,32,16,16,0.1)
        .addState("explosion",80,32,16,16,0.1).addState("explosion",96,32,16,16,0.1);
        this.animationState = "explosion";
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (this.ttl >0) this.ttl -= deltaTime;
        if (this.ttl <=0) this.disposed = true;
    }
}
export default Explosion;
