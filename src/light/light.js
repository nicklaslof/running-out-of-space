class Light{

    constructor(posX,posY,c,sizeX=550, sizeY=550) {
        this.position = {x:posX, y:posY};
        this.c = c;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.u0 = 128/TZ;
        this.u1 = 200/TZ;
        this.v0 = this.u0 + (550/TZ);
        this.v1 = this.u1 + (550/TZ);
    }
    tick(game,deltaTime){
        this.sizeX = Math.max(0,this.sizeX);
        this.sizeY = Math.max(0,this.sizeY);
    }

    render(game){
        game.gl.col = this.c;
        game.gl.img(game.texture.glTexture.tex,-this.sizeX/2,-this.sizeY/2,this.sizeX,this.sizeY,0,this.position.x,this.position.y,1,1, this.u0, this.u1, this.v0, this.v1);
    }

}
export default Light;