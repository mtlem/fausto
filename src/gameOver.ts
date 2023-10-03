import * as Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        // Texto de "Game Over"
    this.add.text(400, 300, 'Game Over', { fontSize: '32px', color: '#000000' }).setOrigin(0.5);

    // Botão para retornar ao menu principal
    const returnButton = this.add.text(400, 400, 'Voltar ao Menu', { fontSize: '24px', color: '#000000' })
        .setOrigin(0.5)
        .setInteractive();

    // Defina um evento de clique para o botão
    returnButton.on('pointerdown', () => {
        // Reinicie o jogo ou vá para a cena do menu principal
        this.scene.start('MainMenu'); // Suponha que 'MainMenu' seja o nome da cena do menu principal
    });

    }
}