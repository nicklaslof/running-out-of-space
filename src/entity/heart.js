import CollisionEntity from "./collisionentity.js";

class Heart extends CollisionEntity{
    constructor(posX, posY, direction) {
        super(posX,posY,34,20,7,7,0xffffffff,14,14,"hp");
        this.position.z = -1;
        this.direction = direction;
        this.speed = 5;
        this.y = posY;
        this.done = false;
        this.angle = 0;
        this.angleSpeed = this.getRandom(0.6,2);

        this.hasLight = true;
        this.lightColor = 0xff0000ff;
        this.lightSize = 250;
        this.lightOffsetX = 15;
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
            otherEntity.health++;
            this.disposed = true;
        }
        super.collidedWith(game,otherEntity);
        
    }
}
export default Heart;