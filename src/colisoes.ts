
import { createFireBall } from "./ataques";
import { createWolf } from "./inimigos/estagio1/wolf";


//colisão com a bola de fogo

// this.physics.add.collider(this.fireballs, this.wolves, (fireball, wolf) => {
//     console.log("Colisão de fireball e wolf");
//     fireball.destroy();
//     wolf.destroy();
// });

export const collisionFireBall = (scene, groupA, groupB, fire, ene) => {
    const enemy = ene;
    const fireball = fire;

    return scene.physics.add.collider(groupA, groupB, (fire, ene) => {
        console.log(`Colisão entre a bola de fogo e ${ene}`)
        fireball.destroy();
        enemy.destroy();
    
    });
}
