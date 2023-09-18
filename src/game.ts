import * as Phaser from 'phaser';
import { createPlayer,loadSprites } from './fausto';

export default class Estagio1 extends Phaser.Scene
{   player;
    constructor ()
    {
        super('Estagio1');
    }

    preload ()
    {
       this.load.image('tiles','./assets/maps/estagio1/grass.png');
       this.load.image('border','./assets/maps/estagio1/water.png');
       this.load.tilemapTiledJSON('map','./assets/maps/estagio1/map.json');
       loadSprites(this)
    }

    create ()
    {
        const  map =this.make.tilemap({key:'map'})
        const tilesetGrass= map.addTilesetImage("grass","tiles");
        const tilesetWater= map.addTilesetImage("water","border");

        //layer
        const ground = map.createLayer('grass',tilesetGrass,0,0);
        const water = map.createLayer('water',tilesetWater,0,0);

        //player
        this.player = createPlayer(this);
        this.physics.world.setBounds(0, 0, 800, 900);
        this.player.setCollideWorldBounds(true);

        //movimentação do personagem
        this.player.controls = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });


    }

    update(){

        //movimentação
        this.player.setVelocity(0);

        if (this.player.controls.left.isDown) {
            this.player.setVelocityX(-150);
            this.player.anims.play('fausto_left',true);
            
        } else if (this.player.controls.right.isDown) {
            this.player.setVelocityX(150);
            this.player.anims.play('fausto_right',true)
            
        }
        
        
        
        if (this.player.controls.up.isDown) {
            
            this.player.setVelocityY(-150);
            this.player.anims.play('fausto_up',true)
        } else if (this.player.controls.down.isDown) {
            this.player.anims.play('fausto_down',true)
            this.player.setVelocityY(150);
        }
        
    }
        


    }


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 640,
    scene: [Estagio1],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{
                y:0,x:0
            }
        }

    }
};

const game = new Phaser.Game(config);
