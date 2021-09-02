import Light from "../light/light.js";

class Entity{
    constructor(posX, posY, texX,texY,texW,texH,c,sizeX, sizeY, type) {
        this.position = {x:posX, y:posY, z:0};
        this.tilePosition = {x:0, y:0}; // Collision entities belongs to tiles to speedup collision detection
        this.u0 = texX/TZ;              // WebGL UVs of the texture
        this.u1 = texY/TZ;              // WebGL UVs of the texture
        this.v0 = this.u0 + (texW/TZ);  // WebGL UVs of the texture
        this.v1 = this.u1 + (texH/TZ);  // WebGL UVs of the texture
        this.c = c;                     // The tint color of the entity. Shortened as c because color is a reserved word so it stays when minifying
        this.sizeX = sizeX;             // Width
        this.sizeY = sizeY;             // Height
        this.rotation = 0;              // Rotation
        this.type = type;               // Type is instead of instanceof that caused me issues on minified version
        this.disposed = false;          // Disposed entities are automatically removed
        this.maxHealth = this.health = 1;// Health and max health
        this.hasLight = false;          // Default entities doesn't have any light. If set a light will be created
        this.lightColor = 0xffffffff;   // Color of the light
        this.lightSize = 500;           // Sixe of the light
        this.horizontalFlip = false;
        this.animationState = null;
        this.previousAnimationState = null;
        this.animation = null;
        this.frameCounter = 0;
        this.animationDelay = 0;
        this.lightOffsetX = 0;
        this.lightOffsetY = 0;
        this.hitTimeout = 0;
        this.hasKnockback = false;
    }

    tick(game, deltaTime){
        if (this.hasLight){
            // Create a light if it doesn't exist already
            if (this.light == null){
                this.light = new Light(this.position.x,this.position.y,this.lightColor,this.lightSize,this.lightSize);
                game.level.addLight(this.light);
            }
            if (this.light != null){
                this.light.position.x = this.position.x + this.lightOffsetX;
                this.light.position.y = this.position.y + this.lightOffsetY;
            } 
        }

        if (this.health <= 0){
            this.disposed = true;
        }

        if (this.disposed){
            this.onDispose(game);
            return;
        }

        if (this.hitTimeout >0) this.hitTimeout -= deltaTime;

        if (this.animationState != this.previousAnimationState){
            this.animationDelay = 0;
            this.previousAnimationState = this.animationState;
        }

        if (this.animationState != null){
            var currentAnimation = this.animation.getAnimationByName(this.animationState);
            if (this.animationDelay <= 0){
                this.frameCounter++;
                if (this.frameCounter > currentAnimation.length-1) this.frameCounter = 0;
                var frame = currentAnimation[this.frameCounter];
                this.u0 = frame[0];
                this.u1 = frame[1];
                this.v0 = frame[2];
                this.v1 = frame[3];
                this.animationDelay = frame[4];
            }else{
                this.animationDelay -= deltaTime;
            }
            
        }
    }

    render(game){
        game.gl.flip = this.horizontalFlip;
        game.gl.col = this.c;
        game.gl.img(game.texture.glTexture.tex,-this.sizeX/2,-this.sizeY/2,this.sizeX,this.sizeY,this.rotation,this.position.x,this.position.y,1,1, this.u0, this.u1, this.v0, this.v1);
    }

    translate(x,y){
        this.position.x += x;
        this.position.y += y;
        if (x < 0) this.horizontalFlip = true;
        if (x > 0 && this.horizontalFlip) this.horizontalFlip = false;
    }

    hit(game, h,direction){
        if (this.hitTimeout > 0) return;
        this.onHit(game,h,direction);
        this.health -= h;
        this.hitTimeout = 0.2;
        if (direction != null && this.hasKnockback){
            var dirX = direction.x*8;
            var dirY = direction.y*8;
            if (dirX + this.position.x < 0 || dirX + this.position.x > W) dirX = 0;
            if (dirY + this.position.y < 0 || dirY + this.position.y > W) dirY = 0;

            this.translate(dirX, dirY);
        }
    }

    onDispose(game){

    }

    setHealth(h){
        this.health = this.maxHealth = h;
        return this;
    }

    onHit(game,h,direction){
        
    }


  // Vector2 distance math
  distance(v1, v2) {
    let x = v1.x - v2.x
    let y = v1.y - v2.y;
    return Math.hypot(x, y);
}




getRandom(min, max){
    return Math.random() * (max - min) + min
}



    // Vector2 normalization
    normalize(v) {
        let len = v.x * v.x + v.y * v.y;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
        }
        v.x *= len;
        v.y *= len;
    }
}

export default Entity;