import Animation from "./animation.js";
import Bullet from "./bullet.js";
import BulletPickup from "./bulletpickup.js";
import Chest from "./chest.js";
import CollisionEntity from "./collisionentity.js";
import Explosion from "./explosion.js";
import Particle from "./particle.js";

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
        this.bulletsPickedup = 0;

    }

    tick(game,deltaTime){
 
        // Move against the player
        if (!game.showIntro){
            let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
            let direction = this.normalize({x:playerPos.x - this.position.x, y: playerPos.y - this.position.y});
            this.translate(direction.x*this.speed*deltaTime,direction.y*this.speed*deltaTime);

            if(this.getRandom(0,200)<1){
                game.level.addEntity(new Bullet(this.position.x,this.position.y,direction,2,1,40,14,3,3,400,20).setSourceEntity(this));
            }

        }


        super.tick(game,deltaTime);
        
    }

    onDispose(game){
        game.level.addEntity(new Explosion(this.position.x, this.position.y));
        for (let i = 0; i < this.bulletsPickedup; i++) {
            console.log("dropping bullet");
            game.level.addEntity(new BulletPickup(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1}).setSourceEntity(this));
            
        }

        if (this.getRandom(0,1) < 0.2){
            game.level.addEntity(new Chest(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1}).setHealth(12));
        }
        game.playExplosion();
    }

    pickupBullet(){
        this.bulletsPickedup++;
    }

    collidedWith(game, otherEntity){
        if (otherEntity.type == "b" && otherEntity.sourceEntity != this && otherEntity.sourceEntity.type != this.type && otherEntity.sourceEntity.type != "wo"){
            this.hit(game,otherEntity.power,otherEntity.direction);
            otherEntity.disposed = true;
            game.level.addEntity(new BulletPickup(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1}).setSourceEntity(this));
            game.level.addEntity(new Particle(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1},0xffffffff));
            game.playHit();
        }

        super.collidedWith(game,otherEntity);
        
    }
    

   

}
export default Enemy;