import Animation from "./animation.js";
import CollisionEntity from "./collisionentity.js";
import Poision from "./poision.js";

class Worm extends CollisionEntity{
    constructor(posX, posY) {
        super(posX,posY,0,10,12,18,0xffffffff,32,24,"wo");
        this.speed = 40;
        this.movement = {x:0,y:0};
        this.hasLight = true;
        this.lightSize = 200;
        this.lightColor = 0xffff00fe;
        this.lightOffsetX = 8;

        this.animation = new Animation();
        this.animation.addState("move",0,11,12,8,0.2).addState("move",12,11,12,8,0.2);
        this.animationState = "move";
        this.hasKnockback = true;
    }

    tick(game,deltaTime){


        // Move against the player if close. The closer the faster.
        let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
        let dist = this.distance(this.position, playerPos);
        let velocity = {x:playerPos.x - this.position.x, y: playerPos.y - this.position.y};
        this.normalize(velocity);
        
        this.translate(velocity.x*this.speed*deltaTime,velocity.y*this.speed*deltaTime);

        super.tick(game,deltaTime);
    }

    collidedWith(game, otherEntity){
        if (otherEntity.type == "b" && otherEntity.sourceEntity != this){
            this.hit(game,1,otherEntity.direction);
            otherEntity.disposed = true;
            game.playHit();
        }

        super.collidedWith(game,otherEntity);
        
    }

    onDispose(game){
        for (let x = -2; x < 2; x++) {
            for (let y = -2; y < 2; y++) {
                var light = (x == 0 && y == 0) ? true : false;
                game.level.addEntity(new Poision(this.position.x+(x*32),this.position.y+(y*32),light)); 
            }   
        }
       
    }

}
export default Worm;