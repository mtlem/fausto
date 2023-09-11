export default class Estagio1 extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaEstagio1'
        });
    }

    preload(){
        this.load.spritesheet('player','img/fausto-sprites.png',{frameWidth: 50, frameHeight:50});
        //this.load.image('tiles','./img/maps/mapaTeste/grass.png');
        this.load.image('border','./img/maps/mapaTeste/water.png');
        this.load.image('tiles','./img/maps/mapaTeste/tilevik.bmp');
        this.load.tilemapTiledJSON('map','./img/maps/mapaTeste/mapTeste.json');


    }
    create(){
        //criando jogador
        this.player = this.physics.add.sprite(50,50,'player')
        this.physics.world.setBounds(0, 0, 800, 900);
        this.player.setCollideWorldBounds(true);

        //criando mapa
        const map = this.make.tilemap({key:'map'});
        const tilesetVik = map.addTilesetImage("ground","tiles");
        const tilesetWater = map.addTilesetImage("water","border");

        //criando a layer

        const ground = map.createLayer('ground',tilesetVik,0,0);
        const water = map.createLayer('water',tilesetWater,0,0);


        //criando a movimentação do personagem
        this.control = this.input.keyboard.createCursorKeys();





    }
    update(){

        this.player.setVelocity(0);

        this.player.setVelocity(0);

        if (this.control.left.isDown) {
            this.player.setVelocityX(-150);
        } else if (this.control.right.isDown) {
            this.player.setVelocityX(150);
        }
    
        if (this.control.up.isDown) {
            this.player.setVelocityY(-150);
        } else if (this.control.down.isDown) {
            this.player.setVelocityY(150);
        };

        
    }
}