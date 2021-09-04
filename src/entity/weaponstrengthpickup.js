import BulletPickup from "./bulletpickup.js";


class WeaponStrengthPickup extends BulletPickup{
    constructor(posX, posY, direction) {
        super(posX,posY,direction, 68, 12, 7, 3);
        this.position.z = -5;
        this.sizeX = 38;
        this.sizeY = 22;
        this.hasLight = true;
        this.lightSize = 80;
        this.lightColor = 0xff00ff00;
        this.type = "wsp";
    }

}

export default WeaponStrengthPickup;