import Tile from "./tile.js";
class FloorTile2 extends Tile{
    constructor(x,y) {
        super(x,y,8,27,8,8,0xffffffff);
        this.x = x;
        this.y = y;
    }
}
export default FloorTile2;