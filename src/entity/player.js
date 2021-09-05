import Animation from "./animation.js";
import Bullet from "./bullet.js";
import BulletCollector from "./bulletcollector.js";
import CollisionEntity from "./collisionentity.js";
import Particle from "./particle.js";
import Weapon from "./weapon.js";

class Player extends CollisionEntity{
    constructor(posX, posY) {
        super(posX,posY,0,0,10,10,0xffffffff,32,32,"p");
        this.position.z = -10;
        this.speed = 230;
        this.movement = {x:0,y:0};
        this.hasLight = true;
        this.lightSize = 100;
        this.lightOffsetX = 8;
        this.lightOffsetY = 8;
        this.bullets = 300;
        this.hasKnockback = true;
        this.weaponPower = 1;

        this.animation = new Animation();
        this.animation.addState("idle",0,0,10,10,0.2).addState("idle",10,0,10,10,0.2);
        this.animation.addState("walk",20,0,10,10,0.1).addState("walk",30,0,10,10,0.1).addState("walk",40,0,10,10,0.1).addState("walk",50,0,10,10,0.1);
        this.animationState = "idle";

        this.weapon = new Weapon(0,0);
        this.weaponDelay = 0;

        //this.bulletCollector = new BulletCollector(this.position.x, this.position.y);
        this.bulletCollector = null;
        this.hasBulletCollector = false;
    }

    tick(game, deltaTime){

        if (this.bullets < 0) this.bullets = 0;
        this.movement.x = game.input.axes.x;
        this.movement.y = game.input.axes.y;

        if (this.movement.x !=0 || this.movement.y !=0) this.animationState = "walk";
        else this.animationState = "idle";

        if (this.hasBulletCollector && this.bulletCollector == null){
            this.bulletCollector = new BulletCollector(this.position.x, this.position.y);
        }

        this.normalize(this.movement);
        this.translate(this.movement.x * this.speed * deltaTime,this.movement.y * this.speed * deltaTime);

        if (game.input.firePressed){
            var weaponOffsetX = this.horizontalFlip ? -26:26;
            this.weapon.position.x = this.position.x+weaponOffsetX;
            this.weapon.position.y = this.position.y+2;
            this.weapon.rotation = 0;
            this.weapon.horizontalFlip = this.horizontalFlip;
        }else{
            var weaponOffsetX = this.horizontalFlip ? -12:12;
            var weaponRotation = this.horizontalFlip ? 1.8:-1.8;
            this.weapon.position.x = this.position.x+weaponOffsetX;
            this.weapon.position.y = this.position.y-20;
            this.weapon.rotation = weaponRotation;
            this.weapon.horizontalFlip = this.horizontalFlip;
        }

        if (this.weaponDelay >0) this.weaponDelay -= deltaTime;
        if (this.bullets>0 && this.weaponDelay <=0 && game.input.firePressed){
            var dir = this.horizontalFlip ? {x:-1,y:0} : {x:1,y:0};
            game.level.addEntity(new Bullet(this.position.x + (dir.x*50), this.position.y,dir,2,this.weaponPower).setSourceEntity(this));
            this.bullets--;
            this.weaponDelay = 0.1;
            game.playShoot();
        }
        if (this.bulletCollector != null) this.bulletCollector.tick(game,deltaTime);

        super.tick(game,deltaTime);
    }
    onHit(game,h,direction){
        game.playPlayerHit();
        game.level.addEntity(new Particle(this.position.x, this.position.y+this.getRandom(-25,25), {x: this.getRandom(-2,2),y: -1},0xff0000ff));
        game.level.ui.addTextParticle(this.position.x-20,this.position.y,"-1 \u2665",{x:this.getRandom(-1,1),y:this.getRandom(-1,-5)},"red",14);
    }

    collidedWith(game, otherEntity){
        if (otherEntity.type == "b" || otherEntity.type == "e" || otherEntity.type == "wo" && otherEntity.setSourceEntity != this){
            this.hit(game,1,otherEntity.direction);
            if (otherEntity.type == "b") otherEntity.disposed = true;
        } 
    }

  
    render(game, deltaTime){
        if (!game.input.firePressed){
            this.weapon.render(game);
            super.render(game, deltaTime);
        }else{
            super.render(game, deltaTime);
            this.weapon.render(game);
        }

        if (this.bulletCollector != null) this.bulletCollector.render(game);
    }
}

export default Player;