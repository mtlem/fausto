export const loadWolfSprites =(scene:Phaser.Scene):void =>{
    scene.load.spritesheet('wolf_walk',"./assets/inimigos/estagio1/wolfWalk.png",{
        frameWidth: 50,
        frameHeight:28,
        spacing:20
    })
}

export const wolfCreateAnimations = (scene:Phaser.Scene):void =>{
    scene.anims.create({
        key: "wolf_walk",
        frames:scene.anims.generateFrameNames('wolf_walk',{
            start:0,
            end:4
        }),
        frameRate:5,
        repeat: -1
    })

}

export const createWolf =(scene:Phaser.Scene)=>{
    const wolf = scene.physics.add.sprite(400,200,'wolf_walk').setScale(1.8);
    wolf.anims.play("wolf_walk",true);
}