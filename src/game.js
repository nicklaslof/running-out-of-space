import { TinySprite } from './lib/sprite.js';
import GlTexture from "./graphic/gltexture.js";
import Level from './level/level.js';
import Input from './input/input.js';
import Texture from './graphic/texture.js';
class Game{
    constructor(){
        var canvas = document.getElementById("g");
        canvas.width = W;
        canvas.height = H;
        this.gl = TinySprite(canvas);
        this.gl.flush();

        this.image = new Image();

        this.texture = new Texture(this.gl.g);
        //this.texture = new GlTexture(this.gl.g,this.image);

        this.image.src = "assets/t.png";

        this.setupLightBuffer();
        
        this.keys =[];
        onkeydown=onkeyup=e=> this.keys[e.keyCode] = e.type;
        this.counter = 0;
        this.fps = 0;

        this.last = 0;

        this.level = new Level();
        this.input = new Input();

        this.pickupSoundDelay = 0;

        
    }

    gameloop(){

        if (this.texture.glTexture.dirty) return;

        var now = performance.now();
        var deltaTime = now - this.last;
        if (deltaTime>1000){
            deltaTime = 0;
        }
        this.last = now;
        if (this.pickupSoundDelay >0)this.pickupSoundDelay -= (deltaTime/1000);
        this.input.tick(this,deltaTime/1000);
        this.level.tick(this,deltaTime/1000);

        // Set blend mode and render the level
        this.gl.g.blendFunc(this.gl.g.SRC_ALPHA,this.gl.g.ONE_MINUS_SRC_ALPHA);

       // this.gl.img(this.texture.tex,0,0,256,256,0,0,0,4,4,0,0,1,1);

        this.level.render(this);
        this.gl.flush();
    
        // Bind the light buffer

        this.gl.g.bindFramebuffer(this.gl.g.FRAMEBUFFER, this.fb);

        // Set the global darkness
        this.gl.bkg(0.2,0.2,0.2,0.4);
        this.gl.cls();
        this.gl.flip = false;
        this.gl.col = 0xffffffff;
        this.gl.g.enable( this.gl.g.BLEND );
        this.gl.g.blendFunc(this.gl.g.SRC_ALPHA, this.gl.g.ONE);
        this.level.renderLight(this);
        this.gl.flush();
        this.gl.g.bindFramebuffer(this.gl.g.FRAMEBUFFER, null);
        
        this.gl.col = 0xffffffff;
        this.gl.g.blendFunc(this.gl.g.DST_COLOR, this.gl.g.ZERO);
        this.gl.img(this.lightTexture,0,0,W,H,0,0,0,1,1,0,1,1,0);



        this.gl.flush();
        this.fps++;

        this.counter += deltaTime/1000;
        if (this.counter > 1){
            console.log(Date.now()+" FPS:"+this.fps);
            this.fps = this.ticks = this.counter = 0;
            this.counter = 0;
        }
    }

    setupLightBuffer(){
        this.lightTexture = new GlTexture(this.gl.g,null).tex;
        this.effectTexture = new GlTexture(this.gl.g, null).tex;
        this.fb = this.setupFrameBuffer(this.gl.g,this.lightTexture);
        
    }

    setupFrameBuffer(gl,texture){
        var fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);   
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return fb;
    }

    playShoot(){
        zzfx(20000,...[1.06,,194,.03,.05,.04,1,1.81,3.5,.2,,,.06,,,,,.72,.03,.05]); // Shoot 673
    }

    playHit(){
        zzfx(20000,...[1.01,,125,,,.07,1,.26,-2.3,-3.8,,,,.6,,,,.62,.1]); // Hit 710
    }

    playLand(){
        zzfx(20000,...[,,378,.02,.02,.01,,.65,-56,34,,,,,,,,,.02,.32]); // Blip 761
    }

    playPickup(){
        if (this.pickupSoundDelay <= 0){
            this.pickupSoundDelay=0.05;
            zzfx(20000,...[,,1168,,.01,.01,,,,,,,,,,.1,,.55,.04]); // Pickup 823
        }
    }

    playPlayerHit(){
        zzfx(20000,...[1.12,,216,,,.31,1,2.68,4.7,-0.7,,,,.4,,.3,,.63,.09,.15]); // Hit 852
    }

}
export default Game;