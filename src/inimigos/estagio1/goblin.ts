import * as Phaser from 'phaser';

export const loadGoblinSprites =(scene:Phaser.Scene):void =>{
    scene.load.spritesheet('goblin_walk','assets/inimigos/estagio1/goblinWalk.png',{
        frameWidth:20,
        frameHeight: 31,
        spacing: 15
    })
}

export const goblinCreateAnimations = (scene: Phaser.Scene):void =>{
    scene.anims.create({
        key: "goblin_walk",
        frames:scene.anims.generateFrameNumbers('goblin_walk',{
            start: 0,
            end: 7
        }),
        frameRate: 12,
        repeat: -1
    })
}

export const createGoblin =(scene:Phaser.Scene)=>{
    const randomWidth = Math.floor(Math.random()* 801);
    const randomHeight = Math.floor(Math.random()* 641);

    const goblin = scene.physics.add.sprite(randomWidth,randomHeight,'goblin_walk').setScale(1.8);
    goblin.anims.play("goblin_walk",true);


    //return goblin // retorna o objeto goblin
    
}


export const updateGoblinPosition = (goblin, player) =>{

     //calculo da direção entre o jogador e o goblin
     const directionX = player.x - goblin.x;
     const directionY = player.y - goblin.y;
 
     //normalizando a direção do vetor unitário
 
     const length = Math.sqrt(directionX * directionX + directionY *directionY);
     const normalizedDirectionX = directionX /length;
     const normalizedDirectionY =directionY/length;
     
 
     //velocidade do lobo
 
     const goblinSpeed =2;
 
 
     //atualizando a posição do lobo com base na direção e na velocidade
 
     goblin.x += normalizedDirectionX *goblinSpeed;
     goblin.y +=normalizedDirectionY * goblinSpeed;

}