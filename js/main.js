import CenaCarregamento from "./cenaCarregamento.js";
import Estagio1 from "./estagio1.js";


const config ={
    type: Phaser.AUTO,
    width: 800,
    height: 900,
    parent: 'fausto-id',
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{
                y:100,
                x:100

            }

        },
        debug:false

    },
    scene: [
        CenaCarregamento,
        Estagio1,
    ]


};

const jogo = new Phaser.Game(config);