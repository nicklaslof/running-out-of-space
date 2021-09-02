class Animation{

    constructor() {
        this.animations = new Map();
    }

    addState(name, texX,texY,texW,texH, delay){
        var animation = this.animations.get(name) ;
        if ( animation == null){
            this.animations.set(name,[]);
            animation = this.animations.get(name);
        }
        var state = [];
        state[0] = texX/TZ;
        state[1] = texY/TZ;
        state[2] = state[0] + (texW/TZ)
        state[3] = state[1] + (texH/TZ);
        state[4] = delay;

        animation.push(state);
        return this;
    }

    getAnimationByName(name){
        return this.animations.get(name);
    }


}

export default Animation;