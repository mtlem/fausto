
import { createFireBall } from "./ataques";
import { createWolf } from "./inimigos/estagio1/wolf";




export const collisionFireBall = (scene, groupA, groupB, fire, ene) => {
   

    return scene.physics.add.collider(groupA, groupB, (fire, ene) => {
        console.log(`Colisão entre a bola de fogo e ${ene}`)
        fire.destroy();
        ene.destroy();
    
    });
}
