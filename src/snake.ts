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


    return snake //

}

export const updateSnakePosition = (snake, player) => {
     //calculo da direção entre o jogador e o lobo
     const directionX = player.x - snake.x;
     const directionY = player.y - snake.y;
 
     //normalizando a direção do vetor unitário
 
     const length = Math.sqrt(directionX * directionX + directionY *directionY);
     const normalizedDirectionX = directionX /length;
     const normalizedDirectionY =directionY/length;
     
 
     //velocidade do lobo
 
     const snakeSpeed =0.5;
 
 
     //atualizando a posição do lobo com base na direção e na velocidade
 
     snake.x += normalizedDirectionX *snakeSpeed;
     snake.y +=normalizedDirectionY * snakeSpeed;
};

