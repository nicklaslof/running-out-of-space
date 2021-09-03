import Entity from "./entity.js";
class Particle extends Entity{

    constructor(posX,posY,direction,c=0xffffffff,ttl=0.5,motion=true,size=8) {
        super(posX,posY,17,22,3,3,c,size,size,"pa");
        this.ttl = ttl;
        this.motion = motion;

        this.direction = direction;
        this.speed = 5;
        this.y = posY;
        this.done = false;
        this.angle = 0;
        this.angleSpeed = this.getRandom(1,4);
        
        this.hasLight = true;
        this.lightColor = c;
        this.lightSize = 10;
        //this.lightOffsetX = 10;
        //this.lightOffsetY = 8;
        var r = this.getRandom(0,1);
        if (r < 0.25) this.setupUV(17,22,3,3);
        else if (r < 0.5) this.setupUV(21,22,3,3);
        else if (r < 0.75) this.setupUV(25,22,3,3);
        else this.setupUV(29,22,3,3);
    }

    tick(game, deltaTime){
        super.tick(game,deltaTime);
        if (this.ttl >0) this.ttl -= deltaTime;
        if (this.ttl <=0) this.disposed = true;

        if (this.disposed) return;

        if (this.motion && !this.done){
            this.angle += deltaTime * this.angleSpeed;
            var sin = Math.sin(this.angle*10);
    
            this.translate(this.direction.x,-sin*this.speed);

            if (this.angle > 0.61){
                this.done = true;
            } 
        }


    }
}

export default Particle;