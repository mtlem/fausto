
import { createFireBall } from "./ataques";
import { createWolf } from "./inimigos/estagio1/wolf";
import { createPlayer } from "./fausto";




export const collisionFireBall = (scene, groupA, groupB, fire, ene) => {
   

    return scene.physics.add.collider(groupA, groupB, (fire, ene) => {
        console.log(`Colisão entre a bola de fogo e ${ene}`)
        fire.destroy();
        ene.destroy();
    
    });
}

export const collisionfiraballEnemy2 = (scene, groupA,groupB, fire,ene) =>{

    return scene.physics.add.collider(groupA, groupB, (fire, ene) => {
        fire.destroy();
        let contador = 0;
        contador++
        ene.destroy()
    
    });
}

export const collisionFireballEnemy3 =(scene,groupA,groupB,fire,ene) =>{
    return scene.physics.add.collider(groupA, groupB, (fire, ene) => {
        fire.destroy();
        let contador = 0;
        contador++
        ene.destroy()
    
    });

}

export const collisionfiraballBoss =(scene,groupA,groupB,fire,ene)=>{
    return scene.physics.add.collider(groupA, groupB, (fire, ene) => {
        fire.destroy();
        ene.destroy();
    
    });

}

export const collisionfireballPlayerFireBallBoss =(scene:Phaser.Scene, groupA,groupB, fireP,fireB)=>{
    return scene.physics.add.collider(groupA,groupB,(fireP,fireB)=>{
        fireP.destroy();
        fireB.destroy();

    })
}



