import * as Phaser from 'phaser';
import { createPlayer,loadSprites } from './fausto';
import { createControls } from './controls';
import { loadFireBallSprite ,fireBallAnims,createFireBall,loadFireballBossSprites,createFireballBoss,updateFireballBossPosition} from './ataques';
import { loadWolfSprites,createWolf,wolfCreateAnimations,updateWolfPosition} from './inimigos/estagio1/wolf';
import { createClock, formatTwoDigits } from './relogio';
import { collisionFireBall, collisionfiraballEnemy2,collisionFireballEnemy3,collisionfiraballBoss,collisionFireballBossPlayer} from './colisoes';
import { loadHeartSprites,createHeart } from './hearts';
import { loadSnakeSprites,snakeCreateAnimations,createSnake,updateSnakePosition } from './snake';
import { loadGoblinSprites,goblinCreateAnimations,createGoblin,updateGoblinPosition } from './inimigos/estagio1/goblin';
import { loadEidarSprites,createEidarAnimations,createEidar,eidarUpdatePosition } from './inimigos/estagio1/eidar';
import MainMenu from './MainMenu';
import GameOverScene from './gameOver';
import VictoryScene from './VictoryScene';
import PontuacaoScene from './pontuacao';
export default class Estagio1 extends Phaser.Scene

{   
    player;
    eidar;
    goblin
    snake;
    wolf;
    lobos;
    controls;
    water;
    clock: Phaser.GameObjects.Text;
    elapsedTime;
    hearts;
    createB
    verifica
    fireBallSound
    private lastFireTime = 0;
    private lastFireTimeBoss =0
    private fireballs: Phaser.Physics.Arcade.Group;
    private enemys:Phaser.Physics.Arcade.Group;
    private snakes: Phaser.Physics.Arcade.Group;
    private goblins: Phaser.Physics.Arcade.Group
    private players:Phaser.Physics.Arcade.Group;
    private bosses:Phaser.Physics.Arcade.Group;
    private fireballsBoss :Phaser.Physics.Arcade.Group
    
    

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
       loadFireballBossSprites(this)
       loadWolfSprites(this)
       loadSnakeSprites(this)
       loadGoblinSprites(this)
       loadHeartSprites(this)
       loadEidarSprites(this)

       //efeitos sonoros
       this.load.audio('fireballSound', './assets/sounds/fireball.mp3')
       this.load.audio('explosionSound','./assets/sounds/explosion.mp3')
       this.load.audio('hurtSound', 'assets/sounds/hurt.mp3')
       this.load.audio('themeSound','assets/sounds/tema.mp3')
   





       
       
    }

    create ()
    {
        //música tema
        const themeSound = this.sound.add('themeSound')
        themeSound.play({volume:0.03})
        const  map =this.make.tilemap({key:'map'})
        const tilesetGrass= map.addTilesetImage("grass","tiles");
        const tilesetWater= map.addTilesetImage("water","border");

        //layer
        const ground = map.createLayer('grass',tilesetGrass,0,0);
        this.water = map.createLayer('water',tilesetWater,0,0);
        this.water.setCollisionByProperty({collider:true})

        //criando os corações
        this.hearts = this.add.group()
        const heart1 = createHeart(this,710,20);
        const heart2 =createHeart(this,750,20);
        const heart3 = createHeart(this,785,20);

        //adicionando corações ao grupo hearts
        this.hearts.add(heart1);
        this.hearts.add(heart2);
        this.hearts.add(heart3);
        //this.hearts.setScale(1 / this.cameras.main.zoom);
        

        

        // pontuação

        let pontuacao = 0;
        //controle de verificação do boss
        this.createB =false
        let bossCollisionOcurred =false;
        this.verifica = bossCollisionOcurred
        let ideiar



        



        


        //player
        this.player = createPlayer(this);
        this.players = this.physics.add.group();
        this.players.add(this.player)
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

        

        //criação das animações da cobra
        snakeCreateAnimations(this)

        //grupos

        this.fireballs = this.physics.add.group();
        this.fireballsBoss =this.physics.add.group()
        this.enemys = this.physics.add.group();
        this.snakes = this.physics.add.group()
        this.goblins = this.physics.add.group()
        this.bosses = this.physics.add.group()



        wolfCreateAnimations(this)
        const wolf =createWolf(this)
        this.wolf =wolf;

       

        //spaw de lobos
        const wolfSpawntimer  = this.time.addEvent({
            delay:5000, //5segundos
            callback: ()=>{

                const lobos =createWolf(this)
                this.enemys.add(lobos);
                collisionFireBall(this,fireballs,enemys,fireball,lobos)
                if(collisionFireBall){
                    const explosionSound = this.sound.add('explosionSound');
                    explosionSound.play({volume: 0.05})
                    pontuacao += 5;
                    console.log(`Pontuação atual é ${pontuacao}`)

                    if (pontuacao >= 50) {
                        if(this.createB == false){
                            const eidar = createEidar(this)
                            this.eidar =eidar
                            //createEidarAnimations(this)
                            this.bosses.add(eidar)
                            this.createB = true
                            
                            
                            // if(!this.verifica&&this.createB == true){
                            //     const currentTime =this.time.now;

                            // }
                            
                            

                           
                        }

                    }
                    
                    
                }
                
            },
            callbackScope:this,
            loop:true,
        })

        //spaw de cobras
        const snakeSpawnTimer = this.time.addEvent({
            delay:3000, // 3 segundos

            callback:()=>{
                const cobras = createSnake(this);
                this.snakes.add(cobras);
                collisionfiraballEnemy2(this,fireballs,this.snakes,fireball,cobras)
                if(collisionfiraballEnemy2){
                    const explosionSound = this.sound.add('explosionSound');
                    explosionSound.play({volume:0.05})
                    pontuacao +=3;
                    console.log(`pontuação atual é ${pontuacao}`)
                    if (pontuacao >= 50) {
                        if(this.createB == false){
                            const eidar =createEidar(this);
                            this.eidar = eidar
                            //createEidarAnimations(this)
                            this.bosses.add(eidar);
                            this.createB = true;
                          
                        }
                    }

                }
            },
            callbackScope:this,
            loop: true

        })


     

        

    
        

        const fireball = createFireBall(this.player,this)
        fireball.destroy();

       const enemys= this.enemys.add(wolf);
        const fireballs =this.fireballs.add(fireball);
        


        collisionFireBall(this, fireballs,enemys,fireball,wolf)

        
       

        


            //criação do relógio na cena
            
        
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
                createFireBall(this.player,this).setScale(0.5);
                const fireballSound = this.sound.add('fireballSound')
                fireballSound.play({volume: 0.05})
                console.log("son da bola de fogo")
               
                


                this.lastFireTime =currentTime;
            }

        



             
         }

           // spwan de fireball boss

             if(this.createB == true){
                const currentTime =this.time.now;

                if(currentTime - this.lastFireTimeBoss >=3000){
                   const fireballBoss = createFireballBoss(this,this.eidar)
                   fireballBoss.update()
                   
                   const fireball = this.fireballs.getChildren()
                   this.fireballsBoss.add(fireballBoss)

                   collisionfiraballBoss(this,this.fireballs,this.fireballsBoss,fireball, fireballBoss)
                 
                   
                    this.lastFireTimeBoss = currentTime

                }
            }
            // atualizando posição da bola de fogo
           
            


         //atualização do tempo
         this.elapsedTime += delta /1000;

         //cálculo de minutos e segundos
         const minutes = Math.floor(this.elapsedTime/60);
         const seconds = Math.floor(this.elapsedTime %60);

         //formatando os minutos e segundos para dois dígitos

         const formattedMinutes  =formatTwoDigits(minutes);
         const formattedSeconds = formatTwoDigits(seconds);

         //importtando variáveis de tempo
         this.registry.set('formattedMinutes', formattedMinutes);
         this.registry.set('formattedSeconds',formattedSeconds)

         

         //combinação os minutos e segundos formatados

         const formattedTime =  `${formattedMinutes}:${formattedSeconds}`;
         //registrando a variável
         //this.registry.set('formattedTime', formattedTime);
        


         //atualizando texo do relógio
         let relogio =this.clock.setText(`Tempo: ${formattedTime}`);
         
         
         


         //movimentação para que o relógio acompanhe a câmera

         this.clock.x =  this.cameras.main.worldView.x +10;
         this.clock.y = this.cameras.main.worldView.y +415; 

         //movimentação para que os corações acompanhem a câmera
         
         const heartsX = this.cameras.main.worldView.right - 10;
         const heartsY = this.cameras.main.worldView.top + 10;
 
         this.hearts.children.iterate((heart, index) => {
            heart.setPosition(heartsX - index * (heart.width + 5), heartsY);
        });
        



         //movimentação dos lobos
         this.enemys.getChildren().forEach((enemy) => {
            updateWolfPosition(enemy, this.player);
        });
        // movimentação das cobras
        const snakes = this.snakes
        this.snakes.getChildren().forEach((snake)=>{
            updateSnakePosition(snake,this.player)
        })
        //movimentação dos goblins
        const goblins = this.goblins;
        this.goblins.getChildren().forEach((goblin)=>{
            updateGoblinPosition(goblin,this.player)
        })

        //movimentação do boss
        

            //Verifica a colisão entre o jogador e os lobos
            let vidas =3;
            
            this.physics.add.collider(this.players, this.enemys, (jogador, enemy) => {
                enemy.destroy();
                vidas--;
                const hurtSound = this.sound.add('hurtSound');
                hurtSound.play({volume: 0.05})
                const heart = this.hearts.getFirstAlive();
               if(heart){
                heart.setAlpha(0); // Faça o coração desaparecer
                heart.setActive(false);
                heart.setVisible(false);
               }
                if(vidas ==0){
                 
                    this.scene.start("GameOver")
                }
               
            });

            //verifica a colisão entre jogador e cobras

            this.physics.add.collider(this.players, this.snakes,(jogador, snake)=>{
                snake.destroy();
                vidas--;
                const hurtSound = this.sound.add('hurtSound')
                hurtSound.play({volume:0.05})
                const heart = this.hearts.getFirstAlive();
                if(heart){
                    heart.setAlpha(0); // Faça o coração desaparecer
                    heart.setActive(false);
                    heart.setVisible(false);

                }
                if(vidas == 0){
                    this.scene.start("GameOver")
                }

            })

            //colisão entre a bola de fogo do boss e o jogador
            this.physics.add.collider(this.players,this.fireballsBoss,(jodador,fireBoss)=>{
                fireBoss.destroy();
                vidas--;
                const hurtSound = this.sound.add('hurtSound')
                hurtSound.play({volume:0.05})
                const heart = this.hearts.getFirstAlive();
               if(heart){
                heart.setAlpha(0); // Faça o coração desaparecer
                heart.setActive(false);
                heart.setVisible(false);
               }
                if(vidas ==0){
                    this.scene.start("GameOver")
                }
              
            })


                 //colisão da bola de fogo com o boss
        this.physics.add.collider(this.fireballs, this.bosses, (fire, boss) => {
            if(!this.verifica){
                this.verifica =true;

                fire.destroy();


                boss.destroy()
                let tempoPlayer = relogio;
                (window as any).tempoPlayer = tempoPlayer
                this.scene.start("Victory")
            }
        
        });
        //colisão entre a bola de fogo do boss com o player

            //movimentação do boss
        if(!this.verifica&&this.createB == true){
            const speed =350;
            eidarUpdatePosition(this.eidar,speed,this)
        }

        // movimentação da bola de fogo:
        this.fireballsBoss.getChildren().forEach((firellBoss) => {
            updateFireballBossPosition(firellBoss,this.player.x,this.player.y)
            
       
        });
       

   
          

            



        

       
       
                 
        
    }
    shutdown(){
        this.sound.get('themeSound').stop();
    }
        


    }


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800, //800, 640
    height: 640,
    scene: [MainMenu,GameOverScene,PontuacaoScene,Estagio1,VictoryScene],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{
                y:0,x:0
            }
        }

    },
    //ativando o antialiading
    render:{
        pixelArt:false
    }
};

const game = new Phaser.Game(config);
