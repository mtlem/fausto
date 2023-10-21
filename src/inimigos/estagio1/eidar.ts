import * as Phaser from 'phaser';

export const loadEidarSprites =(scene:Phaser.Scene):void =>{
    scene.load.spritesheet('eidar_walk',"./assets/inimigos/estagio1/eidarWalk.png",{
     frameWidth: 55,
     frameHeight:67,
     spacing: 20   
    })
}

export const createEidarAnimations =(scene:Phaser.Scene):void =>{
    scene.anims.create({
        key: "eidar_walk",
        frames:scene.anims.generateFrameNames('eidar_walk',{
            start:0,
            end:8
        }),
        frameRate:12,
        repeat: -1
    })
}
export const createEidar =(scene:Phaser.Scene)=>{
    const randomWidth = Math.floor(Math.random()* 801);
    const randomHeight = Math.floor(Math.random()* 641);

    const eidar = scene.physics.add.sprite(randomWidth,randomHeight,'eidar_walk').setScale(1.8);
    eidar.anims.play("eidar_walk", true);

    return eidar;
}