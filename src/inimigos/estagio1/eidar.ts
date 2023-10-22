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
        frameRate:18,
        repeat: -1
    })
}
export const createEidar =(scene:Phaser.Scene)=>{
    const randomWidth = 400
    const randomHeight = 30;

    const eidar = scene.physics.add.sprite(randomWidth,randomHeight,'eidar_walk').setScale(1.5);
    eidar.anims.play("eidar_walk", true);

    return eidar;
}

export const eidarUpdatePosition = (boss, speed, scene: Phaser.Scene) => {
    // Dimensões do jogo
    const screenWidth = scene.game.config.width as number;
    const screenHeight = scene.game.config.height as number;
    const largTeste = 30

    if (boss) {
        if (boss.x >= screenWidth - 30 && boss.y <= screenHeight - 30) {
            boss.setVelocity(0, speed); // Mova para baixo
        } else if (boss.y >= screenHeight - 30 && boss.x >30) {
            boss.setVelocity(-speed, 0); // Mova para a esquerda
        } else if (boss.x <= largTeste && boss.y >30) {
            boss.setVelocity(0, -speed); // Mova para cima quando se aproximar do limite à esquerda
        }else if(boss.y<=30 && boss.x<=30){
            boss.setVelocity(speed,0)
        }
        else {
            boss.setVelocity(speed, 0); // Mova para a direita
            
        }
    }
};
