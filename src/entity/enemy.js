import Animation from "./animation.js";
import BulletPickup from "./bulletpickup.js";
import CollisionEntity from "./collisionentity.js";
import Explosion from "./explosion.js";

class Enemy extends CollisionEntity{

    constructor(posX, posY) {
        super(posX,posY,60,0,10,10,0xffffffff,32,32,"e");
        this.position.z = -1;
        this.speed = 50;
        this.movement = {x:0,y:0};
        this.hasLight = true;
        this.lightColor = 0xff0000ff;
        this.lightSize = 200;
        this.lightOffsetX = 10;
        this.lightOffsetY = 8;
        this.velocity = {x: this.getRandom(-0.6,0.6), y: this.getRandom(-0.6,0.6)};

        this.animation = new Animation();
        this.animation.addState("idle",60,0,10,10,0.2).addState("idle",70,0,10,10,0.2);
        this.animation.addState("walk",60,0,10,10,0.1).addState("walk",70,0,10,10,0.1).addState("walk",80,0,10,10,0.1);
        this.animationState = "walk";

        this.hasKnockback = true;

    }

    tick(game,deltaTime){
 
        // Move against the player
        let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
        let dist = this.distance(this.position, playerPos);
        let velocity = {x:playerPos.x - this.position.x, y: playerPos.y - this.position.y};
        this.normalize(velocity);
        
        this.translate(velocity.x*this.speed*deltaTime,velocity.y*this.speed*deltaTime);

        super.tick(game,deltaTime);
        
    }

    onDispose(game){
        game.level.addEntity(new Explosion(this.position.x, this.position.y));
        game.playExplosion();
    }

    collidedWith(game, otherEntity){
        if (otherEntity.type == "b" && otherEntity.sourceEntity != this){
            this.hit(game,1,otherEntity.direction);
            otherEntity.disposed = true;
            game.level.addEntity(new BulletPickup(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1}));
            game.playHit();
        }

        super.collidedWith(game,otherEntity);
        
    }
    

   

}
export default Enemy;