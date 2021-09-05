import BulletPickup from "./bulletpickup.js";

class BulletCollectorPickup extends BulletPickup{
    constructor(posX, posY, direction,sizeX=24,sizeY=24) {
        super(posX,posY,direction, 88,16,10,10);
        this.position.z = -5;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.hasLight = true;
        this.lightSize = 80;
        this.lightColor = 0xffe5d742;
        this.type = "bcp";
        this.noHorizontalFlip = true;
    }
}
export default BulletCollectorPickup;