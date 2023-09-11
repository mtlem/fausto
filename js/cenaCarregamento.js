export default class CenaCarregamento extends Phaser.Scene{
    constructor(){
        super({
            key: 'CenaCarregamento'
        });
    }

    preload(){
        this.load.on('complete',()=>{
            this.scene.start('CenaEstagio1')
        })

    }
    create(){

    }
    update(){

    }
}