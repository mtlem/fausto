

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

    const fireballSpeed = 150;
    const angle = player.rotation;

    // Calcule as componentes de velocidade horizontal e vertical com base no ângulo
    const velocityX = Math.cos(angle) * fireballSpeed;
    const velocityY = Math.sin(angle) * fireballSpeed;

    fireball.setVelocity(velocityX, velocityY);

    //verificando a direção da fireball
    if(player.controls.left.isDown){
        fireball.setVelocityX(-150);   
    }

    if(player.controls.up.isDown){
        fireball.setVelocityY(-150);
        fireball.setVelocityX(0);
    }else if(player.controls.down.isDown){
        fireball.setVelocityY(150);
        fireball.setVelocityX(0)
    }

    
}
