class Arrow{
    constructor(xPos,yPos) {
        
        this.xPos = xPos;
        this.yPos = yPos;
        this.angle = 0;
    }

    tick(game,deltaTime){
        this.angle += deltaTime*8;

        var sin = Math.sin(this.angle);
        this.xPos += sin;
    }

    render(ui, game){
        ui.drawTextAt("=>",this.xPos,this.yPos,"white",20);
    }


}
export default Arrow;