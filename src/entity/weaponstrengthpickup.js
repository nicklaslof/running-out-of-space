import BulletPickup from "./bulletpickup.js";


class WeaponStrengthPickup extends BulletPickup{
    constructor(posX, posY, direction,sizeX=38,sizeY=22) {
        super(posX,posY,direction, 68, 12, 7, 3);
        this.position.z = -5;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.hasLight = true;
        this.lightSize = 80;
        this.lightColor = 0xff00ff00;
        this.type = "wsp";
        this.noHorizontalFlip = true;
    }

}

export default WeaponStrengthPickup;