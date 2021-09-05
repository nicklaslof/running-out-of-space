import TextParticle from "./textparticle.js";

class UI{
    constructor() {
        this.cv = document.getElementById("u");
        this.cv.width = W;
        this.cv.height = H;
        this.ctx = this.cv.getContext('2d');

        this.textParticles = [];
    }

    tick(game, deltaTime){
        this.textParticles.forEach(t => {
            t.tick(game,deltaTime);
            if (t.disposed) this.removeParticle(t);
        });
    }

    render(game){
        this.ctx.clearRect(0,0,W,H);
        this.drawTextAt("Health: "+game.level.player.health,20,20,"white",18);

        this.drawTextAt("Bullets: "+game.level.player.bullets,170,20,"white",18);

        this.drawTextAt("Weapon power: "+game.level.player.weaponPower,336,20,"white",18);

        var collector = game.level.player.bulletCollector != null ? "yes": "no";

        this.drawTextAt("Bullet collector found: "+collector,536,20,"white",18);

        this.textParticles.forEach(t => {
            t.render(this,game);
        });

    }

    drawTextAt(text,x,y,col, fontSize=16){
        this.doDrawTextAt(text,x+3,y+3,"black", fontSize);
        this.doDrawTextAt(text,x,y,col, fontSize);
    }    

    doDrawTextAt(text,x,y,col, fontSize=16){
        this.ctx.globalAlpha = 1.0
        this.ctx.font = "normal "+fontSize+"px monospace";
        this.ctx.fillStyle = col;
        this.ctx.fillText(text,x,y);
    }

    addTextParticle(xPos,yPos,text,direction,color,fontSize){
        this.textParticles.push(new TextParticle(xPos,yPos,text,direction,color,fontSize));
    }

    removeParticle(t){
        this.removeFromList(t,this.textParticles);
    }

    removeFromList(object,list){
        for(let i = list.length - 1; i >= 0; i--) {
            if(list[i] === object) {
                list.splice(i, 1);
            }
        }
    }

}

export default UI;