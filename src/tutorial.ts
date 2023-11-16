import * as Phaser from 'phaser';

export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    preload() {
        this.load.image('tutorialBackground', './assets/extras/tutorial.jpeg');
        
    }

    create() {
        const background = this.add.image(400, 320, 'tutorialBackground');
        background.setDisplaySize(800, 640);
        background.setOrigin(0.5);
      
        const tutorialText = this.add.text(100, 100, 'Bem-vindo ao Tutorial!\n\nMovimentação: Use as teclas WASD\nAtaque: Pressione J', {
            fontSize: '24px',
            color: '#fff',
            backgroundColor: '#000',
            padding: {
                x: 20,
                y: 10
            }
        });

        // Adicione um botão para voltar ao menu principal
        const backButton = this.add.text(700, 550, 'Menu', {
            fontSize: '18px',
            color: '#fff',
            backgroundColor: '#000',
            padding: {
                x: 10,
                y: 5
            }
        });
        backButton.setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu'); // Altere 'MainMenu' para o nome da sua cena principal
        });
    }

    update() {
        // Lógica de atualização, se necessário
    }
}
