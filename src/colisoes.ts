
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
        console.log(`Contador = ${contador}`)
        ene.destroy()
    
    });
}



