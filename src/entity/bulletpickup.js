import CollisionEntity from "./collisionentity.js";

class BulletPickup extends CollisionEntity{
    constructor(posX, posY, direction,texX=53,texY=13,texW=7,texH=4) {
        super(posX,posY,texX,texY,texW,texH,0xffffffff,15,8,"bp");
        this.direction = direction;
        this.speed = 5;
        this.y = posY;
        this.done = false;
        this.angle = 0;
        this.angleSpeed = this.getRandom(1,4);
        this.sourceEntity = null;
        this.noHorizontalFlip = true;

    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (game.showIntro) return;
        if (this.pickupSoundDelay>0) this.pickupSoundDelay -= deltaTime;
        if (!this.done){
            this.angle += deltaTime * this.angleSpeed;
            var sin = Math.sin(this.angle*10);
    
            this.translate(this.direction.x,-sin*this.speed);
            //this.position.x += this.direction.x;
           // this.position.y += -sin*this.speed;

            if (this.angle > 0.61){
                this.done = true;
                game.playLand();
            } 
        }

        // Move against the player if close. The closer the faster.
        let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
        let dist = this.distance(this.position, playerPos);
        if (dist < 50){
            let velocity = {x:playerPos.x - this.position.x, y: playerPos.y - this.position.y};
            this.normalize(velocity);
            this.position.x += velocity.x*50*deltaTime*(500/dist);
            this.position.y += velocity.y*50*deltaTime*(500/dist);
            super.tick(game,deltaTime);
        }

    }

    setSourceEntity(e){
        this.sourceEntity = e;
        return this;
    }

    collidedWith(game, otherEntity){
        if (otherEntity.type == "p"){
            this.disposed = true;
            if (this.type == "bp"){
                game.playPickup();
                otherEntity.bullets++;
              //  game.level.ui.addTextParticle(this.position.x-20,this.position.y,"Bullets +1",{x:this.getRandom(-1,1),y:this.getRandom(-1,-5)},"white",14);
            }else if (this.type == "wsp"){
                game.playPickup();
                otherEntity.weaponPower++;
                game.level.ui.addTextParticle(this.position.x-20,this.position.y,"Weapon power +1",{x:this.getRandom(-1,1),y:this.getRandom(-1,-5)},"yellow",18);
            }
        }

        if (otherEntity.type == "bc" && this.type == "bp"){
            game.playPickup();
            otherEntity.pickupBullet();
            this.disposed = true;
        }

        if (otherEntity.type == "e" && this.sourceEntity != otherEntity){
            otherEntity.pickupBullet();
            this.disposed = true;
        }

        super.collidedWith(game,otherEntity);
        
    }

}
export default BulletPickup;