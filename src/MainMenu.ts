import * as Phaser from 'phaser';
export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Carregue quaisquer recursos do menu, como imagens de fundo ou botões.
    }

    create() {
        // Crie os elementos do menu, como botões e texto.
        const startButton = this.add.text(
            this.sys.canvas.width / 2,
            this.sys.canvas.height / 2,
            'Iniciar Jogo',
            {
                fontSize: '32px',
                color: '#000000',
            }
        );
        startButton.setOrigin(0.5);

        // Adicione um evento de clique ao botão "Iniciar Jogo" para iniciar o Estágio 1.
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('Estagio1'); // Inicia o Estágio 1
        });
    }
}

