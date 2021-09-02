
// A tile is used for two things. To render ground and other static leveldata. It's also used to have a collection of entities to speed up collision checking between entities close to eachother
class Tile{

    constructor(x,y,texX,texY,texW,texH,col) {
        this.x = x;
        this.y = y;
        this.u0 = texX/TZ;
        this.u1 = texY/TZ;
        this.v0 = this.u0 + (texW/TZ);
        this.v1 = this.u1 + (texH/TZ);
        this.col = col;
        this.entities = [];
    }

    render(game){
        game.gl.col = this.col;
        game.gl.img(game.texture.glTexture.tex,0,0,1,1,0,this.x,this.y,16,16, this.u0, this.u1, this.v0, this.v1);
    }

    // Adds an entity to this tile so it can be used for collision checking.
    addEntityToTile(game,entity){
        this.entities.push(entity);
        
    }

    removeEntityFromTile(entity){
        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(this.entities[i] === entity) {
                this.entities.splice(i, 1);
            }
        }
    }
    // Loop trough all entites in this tile and perform a collision check on them. Skip any particles since they don't have collitions
    checkCollision(game, e){
        this.entities.forEach(oe => {
            if (e.disposed || oe.disposed || e.type == "pa" || oe.type == "pa") return;
            if (e.doesCollide(oe)){
                e.collidedWith(game, oe);
            }
        });
    }
}
export default Tile;