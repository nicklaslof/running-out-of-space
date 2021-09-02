import Entity from "./entity.js";

class Weapon extends Entity{
    constructor(posX,posY) {
        super(posX,posY,0,20,14,6,0xffffffff,52,20,"w");
    }
}
export default Weapon;