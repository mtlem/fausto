import * as Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }
    preload(){
        //adicionando imagem
        //const background =this.add.image(200,200,'fausto_idle','./assets/fausto/fausto-parado.png')
        this.load.image('gameOverBackground', './assets/extras/gameOver.png');
        
    }

    create() {
        //imagem da tela de Game Over(background)
        const background = this.add.image(400, 320, 'gameOverBackground');
        background.setDisplaySize(800, 640);
        background.setOrigin(0.5);
        //configuração da fonte
        const fontConfig = {
            fontFamily: 'Edo SZ', // Substitua pelo nome da fonte instalada na sua máquina
            fontSize: '64px',
            color: '#ffffff'
        };
    

    // Botão para retornar ao menu principal
    const returnButton = this.add.text(400, 590, 'MENU', fontConfig)
        .setOrigin(0.5)
        .setInteractive();

    // Defina um evento de clique para o botão
    returnButton.on('pointerdown', () => {
        // Reinicie o jogo ou vá para a cena do menu principal
        this.scene.start('MainMenu'); // Suponha que 'MainMenu' seja o nome da cena do menu principal
    });

    }
}