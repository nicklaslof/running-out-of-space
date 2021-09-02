import CollisionEntity from "./collisionentity.js";

class Bullet extends CollisionEntity{
    constructor(posX, posY, direction, ttl) {
        super(posX,posY,28,14,6,3,0xffffffff,15,8,"b");
        this.direction = direction;
        this.speed = 800;
        this.ttl = ttl;
        this.hasLight = true;
        this.lightColor = 0xff00ffff;
        this.lightSize = 60;
        this.sourceEntity = null;
        this.setCustomCollisionSize(100,100);
    }

    tick(game, deltaTime){
        this.ttl -= deltaTime;
        if (this.ttl <= 0){
            this.disposed = true;
        }
        this.translate(this.direction.x*this.speed*deltaTime, this.direction.y*this.speed*deltaTime);
        super.tick(game,deltaTime);
    }

    setSourceEntity(e){
        this.sourceEntity = e;
        return this;
    }
    
}
export default Bullet;