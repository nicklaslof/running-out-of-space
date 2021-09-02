import CollisionEntity from "./collisionentity.js";

class BulletPickup extends CollisionEntity{
    constructor(posX, posY, direction) {
        super(posX,posY,53,13,7,4,0xffffffff,15,8,"bp");
        this.direction = direction;
        this.speed = 5;
        this.y = posY;
        this.done = false;
        this.angle = 0;
        this.angleSpeed = this.getRandom(1,4);

    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
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

    collidedWith(game, otherEntity){
        if (otherEntity.type == "p"){
            this.disposed = true;
            game.playPickup();
        }

        super.collidedWith(game,otherEntity);
        
    }

}
export default BulletPickup;