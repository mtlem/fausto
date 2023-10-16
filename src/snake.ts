import * as Phaser from 'phaser';

export const loadSnakeSprites = (scene:Phaser.Scene):void =>{
    scene.load.spritesheet('snake_walk', "./assets/inimigos/estagio1/snakeWalk.png",{
        frameWidth: 50,
        frameHeight: 42,
        spacing: 15
    })

}

export const snakeCreateAnimations = (scene:Phaser.Scene):void =>{
    scene.anims.create({
        key:"snake_walk",
        frames:scene.anims.generateFrameNumbers('snake_walk',{
            start:0,
            end:7
        }),
        frameRate:12,
        repeat: -1
    })
}

export const createSnake = (scene:Phaser.Scene) =>{
    const randomWidth = Math.floor(Math.random()* 801);
    const randomHeight = Math.floor(Math.random()* 641);

    const snake = scene.physics.add.sprite(randomWidth,randomHeight,'wolf_walk').setScale(1.8);
    snake.anims.play("snake_walk",true);


    return snake // retorna o objeto wolf

}