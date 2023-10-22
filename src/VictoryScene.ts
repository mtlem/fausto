import * as Phaser from 'phaser';

export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super('Victory');
    }

    create() {
        // Exiba uma mensagem de vitória
        const victoryText = this.add.text(400, 320, 'Você Venceu!', {
            fontSize: '32px',
            color: '#fff'
        });
        victoryText.setOrigin(0.5);

        // Crie um botão para retornar ao menu principal
        const backButton = this.add.text(400, 400, 'Menu Principal', {
            fontSize: '24px',
            color: '#fff',
            backgroundColor: '#000'
        });
        backButton.setOrigin(0.5);
        backButton.setInteractive();

        // Adicione um evento de clique ao botão
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu'); // Retorna ao menu principal
        });
    }
}
