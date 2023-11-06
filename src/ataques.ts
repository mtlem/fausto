import * as Phaser from 'phaser';



// load de ataques

export const loadFireBallSprite =(scene:Phaser.Scene)=>{

    scene.load.image('fireball','./assets/fausto/fireBallSS.png');


}


//animação de ataques

export const fireBallAnims = (scene: Phaser.Scene): void => {
    scene.anims.create({
        key: 'fireball',
        frames: scene.anims.generateFrameNames('fireball', {
            start: 0,
            end: 7
        }),
        frameRate: 18,
        repeat: -1,
        yoyo: true
    });
}


//criação do primeiro ataque


export const createFireBall = (player, scene) => {
    
    const x = player.x;
    const y = player.y;

    // Crie a bola de fogo como um sprite
    const fireball = scene.physics.add.sprite(x, y, 'fireball');
    fireball.setScale(0.3);

    const fireballSpeed = 350;
    const angle = player.rotation;

    // Calcule as componentes de velocidade horizontal e vertical com base no ângulo
    const velocityX = Math.cos(angle) * fireballSpeed;
    const velocityY = Math.sin(angle) * fireballSpeed;

    fireball.setVelocity(velocityX, velocityY);
    scene.fireballs.add(fireball);

    scene.time.delayedCall(7000,function(){
        fireball.destroy();
    },[],scene)

    

    

    //verificando a direção da fireball
    if(player.controls.left.isDown){
        fireball.setVelocityX(-350);   
    }else if(player.controls.right.isDown){
        fireball.setVelocityX(350)
    }else{
        fireball.setVelocityX(350)
    }

    if(player.controls.up.isDown){
        fireball.setVelocityY(-350);
        fireball.setVelocityX(0);
    }else if(player.controls.down.isDown){
        fireball.setVelocityY(350);
        fireball.setVelocityX(0)
    }

    return fireball;



    
}

export const loadFireballBossSprites =(scene:Phaser.Scene) =>{
    scene.load.image('fireball_boss','./assets/extras/fireBoss.png');
}

export const createFireballBoss=(scene:Phaser.Scene, boss)=>{
    //cacula a distancia da tela
    const screenWidth = scene.game.config.width as number;
    const screenHeight = scene.game.config.height as number;
    const largTeste = 30


    const x = boss.x;
    const y = boss.y;

    // Crie a bola de fogo como um sprite
    const fireballBoss = scene.physics.add.sprite(x, y, 'fireball_boss');
    fireballBoss.setScale(0.6);

    const fireballSpeed = 0.01;
    const angle = boss.rotation;

    // Calcule as componentes de velocidade horizontal e vertical com base no ângulo
    const velocityX = Math.cos(angle) * fireballSpeed;
    const velocityY = Math.sin(angle) * fireballSpeed;

    fireballBoss.setVelocity(velocityX, velocityY);

    // if(boss){
    //     if (boss.x >= screenWidth - 30 && boss.y <= screenHeight - 30) {
    //         fireballBoss.setVelocityX(-350); // Mova para baixo
    //     } if (boss.y >= screenHeight - 30 && boss.x >30) {
    //         fireballBoss.setVelocityY(-350); // Mova para a esquerda
    //     }  if (boss.x <= largTeste && boss.y >30) {
    //         fireballBoss.setVelocityX(350); // Mova para cima quando se aproximar do limite à esquerda
    //     } if(boss.y<=30 && boss.x<=30){
    //         fireballBoss.setVelocityY(350)
    //     }if(boss.y >= screenHeight - 30 && boss.x <= screenWidth -30){
    //         fireballBoss.setAccelerationY(-350)
    //     }
    //     else {
    //         fireballBoss.setVelocityY(350); // Mova para a direita
            
    //     }
    // }
    return fireballBoss
    


}

export const updateFireballBossPosition = (fireball, playerX, playerY) => {
    // Calcula a direção do jogador em relação à bola de fogo
    const angle = Math.atan2(playerY - fireball.y, playerX - fireball.x);

    // Define a velocidade da bola de fogo (ajuste conforme necessário)
    const speed = 5;

    // Atualiza a posição da bola de fogo com base na direção e velocidade
    fireball.x += Math.cos(angle) * speed;
    fireball.y += Math.sin(angle) * speed;
};

export const detroyFireballPlayer=(fireballPlayer)=>{
    fireballPlayer.destroy()
}
export const destroyFireBallBoss =(fireBallBoss)=>{
    fireBallBoss.destroy()
}
