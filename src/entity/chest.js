import Bomb from "./bomb.js";
import BulletPickup from "./bulletpickup.js";
import CollisionEntity from "./collisionentity.js";
import Explosion from "./explosion.js";
import Heart from "./heart.js";
import Particle from "./particle.js";
import WeaponStrengthPickup from "./weaponstrengthpickup.js";

class Chest extends CollisionEntity{
    constructor(posX, posY, direction) {
        super(posX,posY,64,18,16,13,0xffffffff,32,26,"ch");
        this.position.z = -1;
        this.direction = direction;
        this.speed = 5;
        this.y = posY;
        this.done = false;
        this.angle = 0;
        this.angleSpeed = this.getRandom(0.6,2);

        this.hasLight = true;
        this.lightColor = 0xffff9999;
        this.lightSize = 250;
        this.lightOffsetX = 15;
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (game.showIntro) return;
        if (this.pickupSoundDelay>0) this.pickupSoundDelay -= deltaTime;
        if (!this.done){
            this.angle += deltaTime * this.angleSpeed;
            var sin = Math.sin(this.angle*10);
    
            this.translate(this.direction.x,-sin*this.speed);

            if (this.angle > 0.61){
                this.done = true;
                game.playLand();
            } 
        }
    }

    onDispose(game){
        game.level.addEntity(new Explosion(this.position.x, this.position.y));
        for (let i = 0; i < Math.floor(this.getRandom(10,20)); i++) {
            game.level.addEntity(new BulletPickup(this.position.x, this.position.y+this.getRandom(-55,55), {x: this.getRandom(-5,5),y: -1}).setSourceEntity(this));
            game.level.addEntity(new Heart(this.position.x, this.position.y+this.getRandom(-55,55), {x: this.getRandom(-5,5),y: -1}));
        }
        game.level.addEntity(new Bomb(this.position.x, this.position.y+this.getRandom(-25,25),{x: this.getRandom(-5,5),y: -1}).setHealth(5));
        game.level.addEntity(new WeaponStrengthPickup(this.position.x, this.position.y+this.getRandom(-25,25),{x: this.getRandom(-5,5),y: -1}));
        game.playExplosion();
    }


    collidedWith(game, otherEntity){
        if (otherEntity.type == "b" && otherEntity.sourceEntity.type != "e" && otherEntity.sourceEntity.type != "wo"){
            this.hit(game,otherEntity.power,otherEntity.direction);
            otherEntity.disposed = true;
            game.level.addEntity(new BulletPickup(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1}).setSourceEntity(this));
            game.level.addEntity(new Particle(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1},0xffffffff));
            game.playHit();
        }



        super.collidedWith(game,otherEntity);
        
    }
}

export default Chest;