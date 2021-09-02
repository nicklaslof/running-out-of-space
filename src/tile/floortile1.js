import Tile from "./tile.js";
class FloorTile1 extends Tile{
    constructor(x,y) {
        super(x,y,0,27,8,8,0xffffffff);
        this.x = x;
        this.y = y;
    }
}
export default FloorTile1;