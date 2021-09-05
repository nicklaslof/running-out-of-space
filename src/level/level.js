import Enemy from "../entity/enemy.js";
import Entity from "../entity/entity.js";
import Player from "../entity/player.js";
import Worm from "../entity/worm.js";
import Tile from "../tile/tile.js";
import AirTile from "../tile/airtile.js";
import FloorTile1 from "../tile/floortile1.js";
import FloorTile2 from "../tile/floortile2.js";
import UI from "../ui/ui.js";
import Chest from "../entity/chest.js";
import Bomb from "../entity/bomb.js";
import WeaponStrengthPickup from "../entity/weaponstrengthpickup.js";

class Level{

    constructor() {
        this.ui = new UI();

        this.entities = [];
        this.lights = [];
        this.tiles = [];
        this.levelSizeX = (W/32)+10;
        this.levelSizeY = (H/32)+10;


        for (let x = 0; x < this.levelSizeX; x++) {
            for (let y = 0; y < this.levelSizeY; y++) {
                if (this.getRandom(0,1)< 0.5)this.tiles[x + (y*this.levelSizeX)] = new FloorTile1(x*32, y*32);
                else this.tiles[x + (y*this.levelSizeX)] = new FloorTile2(x*32, y*32);
                
            }
            
        }

        this.player = new Player(W/2,H/2).setHealth(30);
        this.entities.push(this.player);
        

        for (let index = 0; index < 1; index++) {
          
        }

        this.addEntity(new WeaponStrengthPickup((H/2)+50, W/2,{x: this.getRandom(-5,5),y: -1}));
      //  this.addEntity(new Bomb(W/2,H/2,{x:0,y:0}).setHealth(5));

        this.spawnEnemy();
        this.spawnWorm();
        setInterval(()=>{this.spawnEnemy();},6000);
        setInterval(()=>{this.spawnWorm();},12000);
        setInterval(()=>{
            this.entities.sort(function (e1, e2) {
                if (e1.position.z > e2.position.z) return -1;
                if (e1.position.z < e2.position.z) return 1;
                return 0;
            });
        },500);


    }

    tick(game, deltaTime){

       
        this.ui.tick(game,deltaTime);

        this.entities.forEach(e => {
            e.tick(game, deltaTime);
            this.checkCollision(game,e);
            if (e.disposed) this.removeEntity(e);
        });
        this.lights.forEach(l => {
            l.tick(game,deltaTime);
            if (l.disposed) this.removeLight(l);
        });
    }

    render(game){
        game.gl.bkg(0.8,0.6,0.9,1);
        game.gl.cls();
        this.tiles.forEach(t => {
            t.render(game);
        });
        this.entities.forEach(entity => {
            entity.render(game);
        });

        this.ui.render(game);
  
    }

    renderLight(game){
        this.lights.forEach(l => {
            l.render(game);
        })
    }

    addEntity(entity){
        this.entities.push(entity);
    }

    addLight(light){
        this.lights.push(light);
    }

    removeLight(light){
        this.removeFromList(light,this.lights);
    }

    removeEntity(entity){
        if (entity.light != null) this.removeLight(entity.light);
        this.removeFromList(entity,this.entities);
       // console.log(this.entities.length);
    }

    removeFromList(object,list){
        for(let i = list.length - 1; i >= 0; i--) {
            if(list[i] === object) {
                list.splice(i, 1);
            }
        }
    }

    addEntityToTile(game, entity, tileX, tileY){
        var t = this.tiles[tileX + (tileY * this.levelSizeX)];
        if (t == null) return;
        t.addEntityToTile(game, entity);
    }
    removeEntityFromTile(entity, tileX, tileY){
        if (tileX > this.levelSizeX-1 || tileX < 0 || tileY > this.levelSizeY-1 || tileY < 0) return;
        this.tiles[tileX + (tileY * this.levelSizeX)].removeEntityFromTile(entity);
    }

    checkCollision(game, entity){
        this.checkTileForCollision(game, entity, entity.tilePosition.x,entity.tilePosition.y);
        this.checkTileForCollision(game, entity, entity.tilePosition.x+1,entity.tilePosition.y);
        this.checkTileForCollision(game, entity, entity.tilePosition.x-1,entity.tilePosition.y);
        this.checkTileForCollision(game, entity, entity.tilePosition.x,entity.tilePosition.y+1);
        this.checkTileForCollision(game, entity, entity.tilePosition.x,entity.tilePosition.y-1);
        
    }

    checkTileForCollision(game,entity,x,y){
        var tile = this.tiles[x + (y * this.levelSizeX)];
        if (tile == null) return;
        tile.checkCollision(game,entity); 
    }

    spawnEnemy(){
        var x = this.getRandom(0,1) < 0.5 ? -20:W+20;
        var y = this.getRandom(0,H);
        this.entities.push(new Enemy(x,y).setHealth(Math.floor(this.getRandom(5,8))));
    }

    spawnWorm(){
        var x = this.getRandom(0,1) < 0.5 ? -20:W+20;
        var y = this.getRandom(0,H);
        this.entities.push(new Worm(x,y).setHealth(3));
    }

    explosion(game){
        this.entities.forEach(e => {
            if (e.type == "e" || e.type == "wo"){
                e.hit(game,50,{x:0,y:0});
                console.log("Hello?=");
            }
        });


    }

    // Used to generate random numbers in various places.
    getRandom(min, max){
        return Math.random() * (max - min) + min
    }

}
export default Level;