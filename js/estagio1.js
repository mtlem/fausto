

export default class Estagio1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaEstagio1'
        });
    }

    preload(){
        this.load.spritesheet('player','img/faustoSprites/fausto-sprites.png',{frameWidth: 47, frameHeight:63
        });

        this.load.spritesheet('cima','img/faustoSprites/faustoUp.png',{frameWidth: 47, frameHeight:63
        });

        this.load.spritesheet('baixo','img/faustoSprites/faustoDown.png',{frameWidth: 47, frameHeight:63
        });

        this.load.spritesheet('esquerda','img/faustoSprites/faustoLeft.png',{frameWidth:50, frameHeight:60})

        this.load.spritesheet('direita','img/faustoSprites/faustoRight.png',{frameWidth: 50, frameHeight:60
        });

        

        
        


    }
    create(){
        
        


        //criando jogador
        this.player = this.physics.add.sprite(50,500,'player')
        this.physics.world.setBounds(0, 0, 800, 900);
        this.player.setCollideWorldBounds(true);

        //animação do jogador
        this.anims.create({
            key:'walkUp',
            frames:this.anims.generateFrameNumbers('cima',{
                start:0,
                end:7
            }),
            frameRate:30,
            repeat: -1

        })

        this.anims.create({
            key:'walkDown',
            frames:this.anims.generateFrameNumbers('baixo',{
                start:0,
                end:7
            }),
            frameRate:30,
            repeat: -1

        })

        this.anims.create({
            key:'walkLeft',
            frames:this.anims.generateFrameNumbers('esquerda',{
                start:0,
                end:5
            }),
            frameRate:30,
            repeat: -1

        })

        this.anims.create({
            key:'walkRight',
            frames:this.anims.generateFrameNumbers('direita',{
                start:0,
                end:8
            }),
            frameRate:30,
            repeat: -1

        })


       

        //criando a movimentação do personagem

        this.controls = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

         //criando a câmera
         this.cameras.main.setBounds(0, 0, 800, 900); // Define os limites da câmera
         this.cameras.main.startFollow(this.player);

         





    }
    update(){

        //movimentação do jogador

        this.player.setVelocity(0);


        if (this.controls.left.isDown) {
            this.player.setVelocityX(-150);
            this.player.anims.play('walkLeft',true)
        } else if (this.controls.right.isDown) {
            this.player.setVelocityX(150);
            this.player.anims.play('walkRight',true)
        }
        
        
        
        if (this.controls.up.isDown) {
            this.player.anims.play('walkUp',true)
            this.player.setVelocityY(-150);
        } else if (this.controls.down.isDown) {
            this.player.anims.play('walkDown',true)
            this.player.setVelocityY(150);
        }
        
    }
}