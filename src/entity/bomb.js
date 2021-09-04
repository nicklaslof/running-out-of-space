import TimedLight from "../light/timedlight.js";
import BulletPickup from "./bulletpickup.js";
import CollisionEntity from "./collisionentity.js";
import Entity from "./entity.js";
import Explosion from "./explosion.js";
import Particle from "./particle.js";

class Bomb extends CollisionEntity{
    constructor(posX,posY, direction) {
        super(posX,posY,49,20,7,8,0xffffffff,38,42,"bo");
        this.position.z = -1;
        this.direction = direction;
        this.speed = 5;
        this.y = posY;
        this.done = false;
        this.angle = 0;
        this.angleSpeed = this.getRandom(0.6,2);

        this.hasLight = true;
        this.lightColor = 0xff00a6ff;
        this.lightSize = 80;
        this.lightOffsetX = 4;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
       
        if (!this.done){
            this.angle += deltaTime * this.angleSpeed;
            var sin = Math.sin(this.angle*10);
    
            this.translate(this.direction.x,-sin*this.speed);

            if (this.angle > 0.61){
                this.done = true;
            } 
        }
    }

    onDispose(game){
        game.level.addEntity(new Explosion(this.position.x, this.position.y,256,256));
        game.level.addLight(new TimedLight(W/2,H/2,0xff00a6ff,W*2,H*2,0.2));
        game.playExplosion();
        game.level.explosion(game);
    }

    collidedWith(game, otherEntity){
        if (otherEntity.type == "b"){
            this.hit(game,1,otherEntity.direction);
            otherEntity.disposed = true;
            game.level.addEntity(new BulletPickup(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1}).setSourceEntity(this));
            game.level.addEntity(new Particle(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1},0xffffffff));
            game.playHit();
        }

        super.collidedWith(game,otherEntity);
        
    }
}
export default Bomb;