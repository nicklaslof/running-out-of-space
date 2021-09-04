import CollisionEntity from "./collisionentity.js";
class BulletCollector extends CollisionEntity{

    constructor(posX,posY){
        super(posX,posY,88,16,10,10,0xffffffff,24,24,"bc");
        this.position.z = -1;
        this.dist = 20;
        this.angle = 0;
        this.rotationSpeed = 10;
        this.movementSpeed = 300;
        this.hasLight = true;
        this.lightColor = 0xffe5d742;
        this.lightSize = 100;
        this.lightOffsetX = 6;
        this.bulletsPickedUp = 0;
        this.givePlayerTimeout = 0;
    }

    tick(game,deltaTime){

        this.givePlayerTimeout -= deltaTime;
        this.angle += deltaTime;
        this.rotation = this.angle;
        if (game.showIntro) return;
        var bullets = game.level.entities.filter((e)=>{
            return e.type == "bp";
        });


        this.pickup(game,deltaTime,bullets);
        console.log(this.currentTarget.type);
      
        let playerPos = {x:game.level.player.position.x, y:game.level.player.position.y};
        let d = this.distance(this.position, playerPos);

        if (this.currentTarget == game.level.player && d <= this.dist){
            this.rotateAroundPlayer(game,deltaTime);
        }
        
        super.tick(game,deltaTime,);

    }

    rotateAroundPlayer(game,deltaTime){
        if (this.light != null) this.light.sizeX = this.light.sizeY = 0;
        var sin = Math.sin(this.angle*this.rotationSpeed)*this.dist;
        var cos = Math.cos(this.angle*this.rotationSpeed)*this.dist;
        var x = sin + game.level.player.position.x;
        var y = cos + game.level.player.position.y;

        this.position.x = x;
        this.position.y = y;

        var bulletsToTransfer = this.bulletsPickedUp > 2 ? 2 : 1;

        if (this.bulletsPickedUp > 0 && bulletsToTransfer > 0 && this.givePlayerTimeout <=0){
            this.bulletsPickedUp -=bulletsToTransfer;
            game.level.player.bullets +=bulletsToTransfer;
            game.playPickupFromCollector();
            this.givePlayerTimeout = 0.075;
        }
    }

    pickup(game,deltaTime,bullets){
        if ((this.currentTarget == game.level.player || this.currentTarget == null) && bullets.length >0){
            bullets.sort(function (a, b) {
                let aDest = a.distanceToOtherEntity(game.level.player.bulletCollector);
                let bDest = b.distanceToOtherEntity(game.level.player.bulletCollector);
                if (aDest > bDest) return 1;
                if (bDest > aDest) return -1;
                return 0;
            });
            this.currentTarget = bullets[0];
        }

        if (this.currentTarget == null){
            this.currentTarget = game.level.player;
        }

        if (this.currentTarget != null){
            if (this.currentTarget.disposed){
                this.currentTarget = game.level.player
                return;
            }
            if (this.light != null) this.light.sizeX = this.light.sizeY = 100;
            let velocity = {x:this.currentTarget.position.x - this.position.x, y: this.currentTarget.position.y - this.position.y};
            this.normalize(velocity);
            this.position.x += velocity.x*this.movementSpeed*deltaTime;
            this.position.y += velocity.y*this.movementSpeed*deltaTime;
        }

    }

    pickupBullet(){
        this.bulletsPickedUp++;
        this.currentTarget = null;
    }


}
export default BulletCollector;