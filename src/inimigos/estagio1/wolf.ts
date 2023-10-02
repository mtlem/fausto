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
            end:3
        }),
        frameRate:12,
        repeat: -1
    })

}

export const createWolf =(scene:Phaser.Scene)=>{
    const wolf = scene.physics.add.sprite(400,200,'wolf_walk').setScale(1.8);
    wolf.anims.play("wolf_walk",true);

    return wolf // retorna o objeto wolf


    
}



export const updateWolfPosition= (wolf, player)=>{
    //calculo da direção entre o jogador e o lobo
    const directionX = player.x - wolf.x;
    const directionY = player.y - wolf.y;

    //normalizando a direção do vetor unitário

    const length = Math.sqrt(directionX * directionX + directionY *directionY);
    const normalizedDirectionX = directionX /length;
    const normalizedDirectionY =directionY/length;
    

    //velocidade do lobo

    const wolfSpeed =2;


    //atualizando a posição do lobo com base na direção e na velocidade

    wolf.x += normalizedDirectionX *wolfSpeed;
    wolf.y +=normalizedDirectionY * wolfSpeed;

}