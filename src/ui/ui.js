
class UI{
    constructor() {
        this.cv = document.getElementById("u");
        this.cv.width = W;
        this.cv.height = H;
        this.ctx = this.cv.getContext('2d');
    }

    tick(game, deltaTime){
        
    }

    render(game){
        this.ctx.clearRect(0,0,W,H);
        this.drawTextAt("Health: "+game.level.player.health,23,23,"black",18);
        this.drawTextAt("Health: "+game.level.player.health,20,20,"white",18);

        this.drawTextAt("Bullets: "+game.level.player.bullets,173,23,"black",18);
        this.drawTextAt("Bullets: "+game.level.player.bullets,170,20,"white",18);
    }


    drawTextAt(text,x,y,col, fontSize=16){
        this.ctx.globalAlpha = 1.0
        this.ctx.font = "normal "+fontSize+"px monospace";
        this.ctx.fillStyle = col;
        this.ctx.fillText(text,x,y);
    }

}

export default UI;