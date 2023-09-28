import * as Phaser from 'phaser';
import { createPlayer,loadSprites } from './fausto';
import { createControls } from './controls';
import { loadFireBallSprite ,fireBallAnims,createFireBall} from './ataques';
import { loadWolfSprites,createWolf,wolfCreateAnimations} from './inimigos/estagio1/wolf';

export default class Estagio1 extends Phaser.Scene

{   player;
    controls;
    water;
    private lastFireTime = 0;
    private fireballs: Phaser.Physics.Arcade.Group;
    private wolves:Phaser.Physics.Arcade.Group;

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
       loadFireBallSprite(this)
       loadWolfSprites(this)




       
       
    }

    create ()
    {
        const  map =this.make.tilemap({key:'map'})
        const tilesetGrass= map.addTilesetImage("grass","tiles");
        const tilesetWater= map.addTilesetImage("water","border");

        //layer
        const ground = map.createLayer('grass',tilesetGrass,0,0);
        this.water = map.createLayer('water',tilesetWater,0,0);
        this.water.setCollisionByProperty({collider:true})

        //player
        this.player = createPlayer(this);
        this.physics.world.setBounds(0, 0, 800, 900);
        this.player.setCollideWorldBounds(true);

        //movimentação do personagem
        this.player.controls = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            'J': Phaser.Input.Keyboard.KeyCodes.J
        });
        

        this.controls = createControls(this);
        this.physics.add.collider(this.player,this.water);

        //configuração da câmera para seguir o personagem;
        this.cameras.main.startFollow(this.player);

        //zoom na câmera
        this.cameras.main.setZoom(1.40);

        //definindo os limites da cÂmera
        const mapWidthInPixels = 800;
        const mapHeightInPixels = 640;

        this.cameras.main.setBounds(0,0,mapWidthInPixels,mapHeightInPixels);

        

        
        
     

        //colisão do lobo com a bola de fogo

        this.fireballs = this.physics.add.group();
        this.wolves = this.physics.add.group();

        wolfCreateAnimations(this)
        const wolf =createWolf(this)
        const fireball = createFireBall(this.player,this)

        this.wolves.add(wolf);
        this.fireballs.add(fireball)
        



        


        this.physics.add.collider(this.fireballs, this.wolves, (fireball, wolf) => {
            console.log("Colisão de fireball e wolf");
            fireball.destroy();
            wolf.destroy();
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

         if(this.player.controls.J.isDown){
            const currentTime  = this.time.now;

            if(currentTime -this.lastFireTime >=300){
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                
                createFireBall(this.player,this);

                this.lastFireTime =currentTime;
            }


            
             

             
             
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
