import CollisionEntity from "./collisionentity.js";

class Bullet extends CollisionEntity{
    constructor(posX, posY, direction, ttl,power, texX=28,texY=14,texW=6,texH=3,speed=800,lightSize=60) {
        super(posX,posY,texX,texY,texW,texH,0xffffffff,15,8,"b");
        this.direction = direction;
        this.speed = speed;
        this.ttl = ttl;
        this.hasLight = true;
        this.lightColor = 0xff00ffff;
        this.lightSize = lightSize;
        this.sourceEntity = null;
        this.power = power;
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