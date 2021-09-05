class TextParticle{
    constructor(xPos,yPos,text,direction,color="white",fontSize=20, ttl=3) {
        
        this.xPos = xPos;
        this.yPos = yPos;
        this.text = text;
        this.direction = direction;
        this.color = color;
        this.fontSize = fontSize;
        this.ttl = ttl;
    }

    tick(game,deltaTime){
        this.xPos += this.direction.x * 20 * deltaTime;
        this.yPos += this.direction.y * 20 * deltaTime;
        this.ttl -= deltaTime;

        if (this.ttl < 0 ) this.disposed = true;
    }

    render(ui, game){
        ui.drawTextAt(this.text,this.xPos,this.yPos,this.color, this.fontSize);
    }

}
export default TextParticle;