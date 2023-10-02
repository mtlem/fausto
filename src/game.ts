import * as Phaser from 'phaser';
import { createPlayer,loadSprites } from './fausto';
import { createControls } from './controls';
import { loadFireBallSprite ,fireBallAnims,createFireBall} from './ataques';
import { loadWolfSprites,createWolf,wolfCreateAnimations,updateWolfPosition} from './inimigos/estagio1/wolf';
import { createClock, formatTwoDigits } from './relogio';

export default class Estagio1 extends Phaser.Scene

{   player;
    wolf;
    controls;
    water;
    clock: Phaser.GameObjects.Text;
    elapsedTime;
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
        this.cameras.main.setZoom(1.4);

        //definindo os limites da cÂmera
        const mapWidthInPixels = 800;
        const mapHeightInPixels = 640;

        this.cameras.main.setBounds(0,0,mapWidthInPixels,mapHeightInPixels);

        

        
        
     

        //colisão do lobo com a bola de fogo

        this.fireballs = this.physics.add.group();
        this.wolves = this.physics.add.group();

        wolfCreateAnimations(this)
        const wolf =createWolf(this)
        this.wolf =wolf;
        const fireball = createFireBall(this.player,this)

        this.wolves.add(wolf);
        this.fireballs.add(fireball)
        



        


        this.physics.add.collider(this.fireballs, this.wolves, (fireball, wolf) => {
            console.log("Colisão de fireball e wolf");
            fireball.destroy();
            wolf.destroy();
        });

            //criação do relógio na cena
            // Crie o objeto de texto do relógio e atribua-o à propriedade clockText
        
            this.clock =createClock(this,10,10)
            //configuração do relólgio para seguir a câmera
            this.clock.setScrollFactor(1, 1);
            
            this.elapsedTime =0;




    }

    




    update(time, delta){

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
                this.player.anims.play('fausto_atk')
                createFireBall(this.player,this);

                this.lastFireTime =currentTime;
            }


             
         }


         //atualização do tempo
         this.elapsedTime += delta /1000;

         //cálculo de minutos e segundos
         const minutes = Math.floor(this.elapsedTime/60);
         const seconds = Math.floor(this.elapsedTime %60);

         //formatando os minutos e segundos para dois dígitos

         const formattedMinutes  =formatTwoDigits(minutes);
         const formattedSeconds = formatTwoDigits(seconds)

         //combinação os minutos e segundos formatados

         const formattedTime =  `${formattedMinutes}:${formattedSeconds}`;

         //atualizando texo do relógio
         this.clock.setText(`Tempo: ${formattedTime}`);


         //movimentação para que o relógio siga o player

         this.clock.x =  this.cameras.main.worldView.x +10;
         this.clock.y = this.cameras.main.worldView.y +10; 


         //movimentação do lobo
         updateWolfPosition(this.wolf,this.player);
         
         
         

         
         



       

         
        
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
